import React, {
  FC,
  FormEventHandler,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import { Button } from '../../components/button';
import './foods.scss';
import { ListItem } from '../../components/list-item/list-item';
import Field from '../../components/field/field';
import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSvg from '../../assets/svg/loading.svg';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';
import { Food } from '../../services/food/food.model';
import { DataContext } from '../../providers';

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

  function renderFood(food: Food): ReactElement | null {
    if (food.type.en === 'Recipe' || !food.icon) return null;

    return (
      <ListItem
        isActive={food.id === currentFood?.id}
        key={food.name[language]}
        onClick={() => {
          setCurrentFood(food);
          setCurrentFoodQuantity(100);
        }}
        icon={<Image src={food.icon} alt="" transparent />}
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
        className="paper-bg container"
        style={{ paddingBottom: '40px', paddingTop: '40px' }}
      >
        {/* <FoodRegister food={FOOD} /> */}

        <h1 className="section-title">{translate('foodListHeading', language)}</h1>

        <Field
          placeholder={translate('searchPlaceholder', language)}
          onChange={handleChangeFilter}
          breakline={false}
          onErase={() => setSearchInput('')}
          value={searchInput}
        />

        {foods.length ? (
          <ol className="list">{cuttedOrderedFoods.map(renderFood)}</ol>
        ) : (
          <LoadingSvg />
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


