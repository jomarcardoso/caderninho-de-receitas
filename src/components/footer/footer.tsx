import React, { FC, useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import SvgIcon from '@mui/material/SvgIcon';
import { borderLight } from '../page/page';

const useStyles = makeStyles({
  root: {
    bottom: 0,
    height: 48,
    minHeight: 48,
    overflow: 'hidden',
    position: 'sticky',
    ...borderLight,
  },
  navigation: {
    height: '100%',
  },
  button: {
    display: 'block',
    paddingTop: '8px !important',

    '&[hidden]': {
      visibility: 'hidden',
    },
  },
});

export interface FooterProps {
  items?: BottomNavigationActionProps[];
}

const Footer: FC<FooterProps> = ({ items = [] }) => {
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
        <BottomNavigation className={classes.navigation}>
          {items.map(renderItem)}
        </BottomNavigation>
      </Box>
    );
  }

  const renderMemo = useMemo(render, [
    classes.button,
    classes.navigation,
    classes.root,
    items,
  ]);

  return renderMemo;
};

export default Footer;
