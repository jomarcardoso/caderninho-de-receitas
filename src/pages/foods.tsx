import React, { FC, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'gatsby-theme-material-ui';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Image from '../components/image';
import Layout from '../components/layout/layout';
import FoodsContext from '../contexts/foods-context';

const useStyles = makeStyles({
  selectIcon: {
    minWidth: '20px',
    width: '20px',
    marginRight: '10px',
  },
  img: {
    width: '100%',
  },
  anchor: {
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  listItem: {
    padding: 0,
  },
});

const Foods: FC = () => {
  const foods = useContext(FoodsContext);
  const classes = useStyles();
  const orderedFood = foods.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }

    // a must be equal to b
    return 0;
  });

  return (
    <Layout pageName="Alimentos">
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Medida 100g</TableCell>
              <TableCell align="right">Calorias</TableCell>
              <TableCell align="right">Índice Glicêmico</TableCell>
              <TableCell align="right">Acidificação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedFood.map(
              ({ name, image, enName, calories, acidification, gi }) => (
                <TableRow key={name}>
                  <TableCell component="th" scope="row">
                    <ListItem className={classes.listItem}>
                      <Link
                        to={`/food/${enName}`}
                        className={classes.anchor}
                        color="inherit"
                      >
                        <ListItemIcon className={classes.selectIcon}>
                          <Image className={classes.img} src={image} alt="" />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </Link>
                    </ListItem>
                  </TableCell>
                  <TableCell align="right">{calories}</TableCell>
                  <TableCell align="right">{gi}</TableCell>
                  <TableCell align="right">{acidification}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Foods;
