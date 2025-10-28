import {
  type FC,
  type FormEventHandler,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import { Button } from 'notebook-layout';
import './foods.scss';
import { ListItem } from '../../components/list-item/list-item';
import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSvg from 'images/svg/loading.svg?react';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import type { Food } from 'services/food/food.model';
import { DataContext } from '../../providers';
import { getFoodIconsMapById, type FoodIconByIdEntry } from '../../services/icons.api';
import { Field } from 'notebook-layout';
import HealthContext from '../../providers/health/health.context';
import RoleContext from '../../providers/role/role.context';

interface Props {
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantityToShow?: number;
  currentFood?: Food;
}

let timeoutSearch: NodeJS.Timeout;

const FoodsPanel: FC<Props> = ({
  setCurrentFood,
  setCurrentFoodQuantity,
  quantityToShow: externalQuantityToShow = 40,
  currentFood,
}) => {
  const { language } = useContext(LanguageContext);
  const {
    data: { foods },
  } = useContext(DataContext);
  const { serverUp } = useContext(HealthContext);
  const { canEditFood } = useContext(RoleContext);
  const [quantityToShow, setQuantityToShow] = useState(externalQuantityToShow);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  let searchedFoods = JSON.parse(JSON.stringify(foods)) as Food[];

  if (search) {
    searchedFoods = [...foods].filter(
      (food) =>
        food.name[language].toLowerCase().includes(search.toLowerCase()) ||
        food.description[language]
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        food.keys[language]
          .split(', ')
          .some((key = '') => key.toLowerCase().includes(search.toLowerCase())),
    );
  }

  const orderedFoods = searchedFoods.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });

  const cuttedOrderedFoods = orderedFoods.slice(0, quantityToShow);

  const [iconMap, setIconMap] = useState<Record<number, string>>({});

  function toDataUrl(entry: FoodIconByIdEntry | undefined): string | undefined {
    if (!entry || !entry.content) return undefined;
    const media = (entry.mediaType || '').toLowerCase();
    const isSvg = media.includes('svg') || entry.content.trim().startsWith('<');
    return isSvg
      ? `data:image/svg+xml;utf8,${encodeURIComponent(entry.content)}`
      : `data:${entry.mediaType || 'image/png'};base64,${entry.content}`;
  }

  // Build a stable key for current icon ids to avoid infinite refetch loops
  const iconIdsKey = useMemo(
    () => {
      const ids = cuttedOrderedFoods
        .map((f) => (f as any).iconId as number)
        .filter((n) => typeof n === 'number' && n > 0)
        .sort((a, b) => a - b);
      return ids.join(',');
    },
    [
      // dependency is a string that stays identical when ids don't change
      cuttedOrderedFoods
        .map((f) => (f as any).iconId as number)
        .filter((n) => typeof n === 'number' && n > 0)
        .sort((a, b) => a - b)
        .join(','),
    ],
  );

  useEffect(() => {
    if (!iconIdsKey) return;
    const iconIds = iconIdsKey.split(',').map((s) => Number(s)).filter((n) => n > 0);
    (async () => {
      try {
        const map = await getFoodIconsMapById(iconIds);
        const urls: Record<number, string> = {};
        for (const k of Object.keys(map)) {
          const id = Number(k);
          const url = toDataUrl(map[id]);
          if (id > 0 && url) urls[id] = url;
        }
        setIconMap(urls);
      } catch {
        // ignore
      }
    })();
  }, [iconIdsKey]);

  function renderFood(food: Food): ReactElement | null {
    const isRecipeFood = (food as any).isRecipe === true || (food.type?.en === 'Recipe');
    // Hide recipe-backed foods for normal users; show for keepers/admin/owner
    if (!canEditFood && isRecipeFood) return null;

    return (
      <ListItem
        isActive={food.id === currentFood?.id}
        key={food.name[language]}
        onClick={() => {
          setCurrentFood(food);
          setCurrentFoodQuantity(100);
        }}
        icon={<Image src={iconMap[(food as any).iconId as any] || food.icon} alt="" transparent />}
      >
        {food.name[language]}
      </ListItem>
    );
  }

  const handleShowMore = useCallback(() => {
    setQuantityToShow(quantityToShow + 40);
  }, [quantityToShow]);

  const handleChangeFilter: FormEventHandler<HTMLInputElement> = (event) => {
    setSearchInput((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    clearTimeout(timeoutSearch);

    timeoutSearch = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
  }, [searchInput]);

  return (
    <Layout
      showHeader={false}
      className="foods"
      footerProps={{
        items: [
          {
            onClick: () => {},
            icon: <IoAddCircleOutline />,
            key: 'add',
          },
        ],
      }}
    >
      <div
        className="theme-light paper-bg container"
        style={{ paddingBottom: '40px', paddingTop: '40px' }}
      >
        {/* <FoodRegister food={FOOD} /> */}

        <h1 className="section-title">
          {translate('foodListHeading', language)}
        </h1>

        <Field
          placeholder={translate('searchPlaceholder', language)}
          onChange={handleChangeFilter}
          breakline={false}
          onErase={() => setSearchInput('')}
          value={searchInput}
        />

        {foods.length ? (
          <ol className="list">{cuttedOrderedFoods.map(renderFood)}</ol>
        ) : serverUp ? (
          <LoadingSvg />
        ) : (
          <p style={{ opacity: 0.7 }}>
            {translate('noConnectionNoLocalData', language) || 'Sem conexão e sem dados locais. Abra o app uma vez com servidor online para popular o cache.'}
          </p>
        )}

        {orderedFoods.length >= quantityToShow && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '32px',
              marginBottom: '40px',
            }}
          >
            <Button variant="secondary" onClick={handleShowMore}>
              {translate('showMore', language)}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FoodsPanel;

