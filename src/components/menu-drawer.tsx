import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link } from 'gatsby';
import CakeIcon from '@material-ui/icons/Cake';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  anchor: {
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

interface Props {
  opened: boolean;
  toggleDrawer(open: boolean): void;
}

const MenuDrawer: FC<Props> = ({ opened, toggleDrawer }) => {
  const classes = useStyles();

  const list = (
    <a
      href="#drawer"
      className={classes.list}
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem component="li" button>
          <Link to="/advertise" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Esclarecimentos" />
          </Link>
        </ListItem>
        <ListItem component="li" button>
          <Link to="/recipe" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <CakeIcon />
            </ListItemIcon>
            <ListItemText primary="Cadastrar refeição" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component="li" button>
          <Link to="/foods" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <CakeIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de alimentos" />
          </Link>
        </ListItem>
      </List>
    </a>
  );

  return (
    <div>
      <Drawer anchor="left" open={opened} onClose={() => toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
