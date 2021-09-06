import React, { FC, useMemo } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { borderLight } from '../page/page';

const useStyles = makeStyles({
  root: {
    bottom: 0,
    overflow: 'hidden',
    position: 'sticky',
    ...borderLight,
  },
  button: {
    display: 'block',
  },
});

export interface Footer2Props {
  items?: BottomNavigationActionProps[];
}

const Footer2: FC<Footer2Props> = ({ items = [] }) => {
  const classes = useStyles();

  function render() {
    function renderItem({ icon, ...props }: BottomNavigationActionProps) {
      return (
        <BottomNavigationAction
          className={classes.button}
          icon={<SvgIcon>{icon}</SvgIcon>}
          {...props}
        />
      );
    }

    return (
      <Box borderTop={1} component="footer" className={classes.root} zIndex={1}>
        <BottomNavigation>{items.map(renderItem)}</BottomNavigation>
      </Box>
    );
  }

  const renderMemo = useMemo(render, [classes.button, classes.root, items]);

  return renderMemo;
};

export default Footer2;
