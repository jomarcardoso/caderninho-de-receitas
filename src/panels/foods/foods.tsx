import React, { FC, ReactElement, useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import FoodsContext from '../../contexts/foods-context';
import { Food } from '../../services/food';
import Button from '../../components/button/button';
import './foods.scss';
import { ListItem } from '../../components/list-item/list-item';
import SectionTitle from '../../components/section-title/section-title';

interface Props {
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}

const FoodsPanel: FC<Props> = ({ setCurrentFood }) => {
  const foods = useContext(FoodsContext);
  const [quantityToShow, setQuantityToShow] = React.useState(40);

  const orderedFoods = foods.sort((a, b) => {
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
    if (food.recipe) return null;

    return (
      <ListItem
        isAction
        className="list-item"
        onClick={() => setCurrentFood(food)}
        image={<Image src={food.icon} alt="" transparent />}
      >
        {food.name}
      </ListItem>
    );
  }

  const handleShowMore = useCallback(() => {
    setQuantityToShow(quantityToShow + 40);
  }, [quantityToShow]);

  return (
    <Layout
      showHeader={false}
      showFooter={false}
      currentPage="FOODS"
      mainProps={{ my: 5 }}
      className="foods-panel"
    >
      <SectionTitle opaque>Lista de alimentos</SectionTitle>
      <ol className="list">{cuttedOrderedFoods.map(renderFood)}</ol>
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Button color="secondary" onClick={handleShowMore}>
          mostrar mais
        </Button>
      </Box>
    </Layout>
  );
};

export default FoodsPanel;
