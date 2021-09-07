import React, { FC, ReactElement, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
        <TableCell align="right">{food.calories}</TableCell>
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
