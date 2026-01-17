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
import type { Food } from '../../services/food';
import { Button } from '../../components/button';
import './foods.scss';
import { ListItem } from '../../components/list-item/list-item';
import Field from '../../components/field/field';
import { foods } from '../../db/food';

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
  const [quantityToShow, setQuantityToShow] = useState(externalQuantityToShow);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  let searchedFoods = [...foods];

  if (search) {
    searchedFoods = [...foods].filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.description.toLowerCase().includes(search.toLowerCase()) ||
        food.keys.some((key) =>
          key.toLowerCase().includes(search.toLowerCase()),
        ),
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
    if (food.recipe || !food.icon) return null;

    return (
      <ListItem
        isActive={food.id === currentFood?.id}
        key={food.name}
        onClick={() => {
          setCurrentFood(food);
          setCurrentFoodQuantity(100);
        }}
        icon={<Image src={food.icon} alt="" transparent />}
      >
        {food.name}
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
    <Layout showHeader={false} showFooter={false} className="foods">
      <div
        className="paper-bg container"
        style={{ paddingBottom: '40px', paddingTop: '40px' }}
      >
        <h1 className="section-title">Lista de alimentos</h1>

        <Field
          placeholder="buscar"
          onChange={handleChangeFilter}
          breakline={false}
          onErase={() => setSearchInput('')}
          value={searchInput}
        />

        <ol className="list">{cuttedOrderedFoods.map(renderFood)}</ol>

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
              mostrar mais
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FoodsPanel;
