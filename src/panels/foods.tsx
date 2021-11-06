import React, { FC, ReactElement, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from '../components/image/image';
import Layout from '../components/layout/layout';
import FoodsContext from '../contexts/foods-context';
import { CurrentPage } from '../services/page.service';
import { Food } from '../services/food';

const useStyles = makeStyles({
  selectIcon: {
    minWidth: '20px',
    width: '20px',
    marginRight: '10px',
  },
  img: {
    width: '100%',
  },
  listItem: {
    padding: 0,
  },
});

interface Props {
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}

const FoodsPanel: FC<Props> = ({ setCurrentFood }) => {
  const foods = useContext(FoodsContext);
  const classes = useStyles();
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
            className={classes.listItem}
            button
            onClick={() => setCurrentFood(food)}
          >
            <ListItemIcon className={classes.selectIcon}>
              <Image className={classes.img} src={food.icon} alt="" />
            </ListItemIcon>
            <ListItemText primary={food.name} />
          </ListItem>
        </TableCell>
        <TableCell align="right">{Math.round(food.calories)}</TableCell>
      </TableRow>
    );
  }

  return (
    <Layout
      showHeader={false}
      showFooter={false}
      currentPage={CurrentPage.FOODS}
    >
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
