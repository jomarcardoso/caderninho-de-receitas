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
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';
import FoodsContext from '../../contexts/foods-context';
import { Food } from '../../services/food';
import './foods.scss';

interface Props {
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}

const FoodsPanel: FC<Props> = ({ setCurrentFood }) => {
  const foods = useContext(FoodsContext);

  const orderedFood = foods.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });

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

  return (
    <Layout showHeader={false} showFooter={false} currentPage="FOODS">
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Medida 100g</TableCell>
              <TableCell align="right">Calorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{orderedFood.map(renderFood)}</TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default FoodsPanel;
