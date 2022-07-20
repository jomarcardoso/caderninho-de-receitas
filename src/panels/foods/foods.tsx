import React, {
  FC,
  FormEventHandler,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import FoodsContext from '../../contexts/foods-context';
import { Food } from '../../services/food';
import { Button } from '../../components/button';
import './foods.scss';
import { ListItem } from '../../components/list-item/list-item';
import SectionTitle from '../../components/section-title/section-title';
import Field from '../../components/field/field';

interface Props {
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity: React.Dispatch<React.SetStateAction<number>>;
}

let timeoutSearch: NodeJS.Timeout;

const FoodsPanel: FC<Props> = ({ setCurrentFood, setCurrentFoodQuantity }) => {
  const foods = useContext(FoodsContext);
  const [quantityToShow, setQuantityToShow] = useState(40);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  let searchedFoods = [...foods];

  if (search) {
    searchedFoods = foods.filter(
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
        key={food.name}
        isAction
        className="list-item"
        onClick={() => {
          setCurrentFood(food);
          setCurrentFoodQuantity(100);
        }}
        image={<Image src={food.icon} alt="" transparent />}
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
    <Layout
      showHeader={false}
      showFooter={false}
      currentPage="FOODS"
      mainProps={{ my: 5 }}
      className="foods-panel"
    >
      <SectionTitle opaque>Lista de alimentos</SectionTitle>
      <Field
        placeholder="buscar"
        onChange={handleChangeFilter}
        breakline={false}
        onErase={() => setSearchInput('')}
        value={searchInput}
      />
      <ol className="list">{cuttedOrderedFoods.map(renderFood)}</ol>
      {orderedFoods.length >= quantityToShow && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={4}
          marginBottom={5}
        >
          <Button variant="secondary" onClick={handleShowMore}>
            mostrar mais
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default FoodsPanel;
