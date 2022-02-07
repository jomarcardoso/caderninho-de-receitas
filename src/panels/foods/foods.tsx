import React, { FC, ReactElement, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import FoodsContext from '../../contexts/foods-context';
import { Food } from '../../services/food';
import Button from '../../components/button/button';
import './foods.scss';

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

  function renderFood(food: Food): ReactElement {
    if (food.recipe) return <></>;

    return (
      <TableRow key={food.name}>
        <TableCell component="th" scope="row">
          <ListItem
            className="foods-panel__list-item"
            button
            onClick={() => setCurrentFood(food)}
          >
            <ListItemIcon className="foods-panel__icon">
              <Image className="foods-panel__img" src={food.icon} alt="" />
            </ListItemIcon>
            <ListItemText primary={food.name} />
          </ListItem>
        </TableCell>
        <TableCell align="right">{Math.round(food.calories)}</TableCell>
      </TableRow>
    );
  }

  function handleShowMore(): void {
    setQuantityToShow(quantityToShow + 40);
  }

  return (
    <Layout
      showHeader={false}
      showFooter={false}
      currentPage="FOODS"
      mainProps={{ my: 5 }}
    >
      <TableContainer>
        <Table size="small" aria-label="tabela de alimentos">
          <TableHead>
            <TableRow>
              <TableCell>Medida 100g</TableCell>
              <TableCell align="right">Calorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{cuttedOrderedFoods.map(renderFood)}</TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginTop={4}>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Button color="secondary" onClick={handleShowMore}>
          mostrar mais
        </Button>
      </Box>
    </Layout>
  );
};

export default FoodsPanel;
