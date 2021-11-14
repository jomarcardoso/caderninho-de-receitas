import React, { FC, useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';
import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import SvgIcon from '@mui/material/SvgIcon';
import './footer.scss';

const useStyles = makeStyles({
  button: {
    display: 'block',
    paddingTop: '8px !important',

    '&[hidden]': {
      visibility: 'hidden',
    },
  },
});

interface Props {
  items?: BottomNavigationActionProps[];
}

export type FooterProps = Props & BoxProps;

const Footer: FC<FooterProps> = ({ items = [], ...props }) => {
  const classes = useStyles();

  function render() {
    function renderItem({ icon, ...itemProps }: BottomNavigationActionProps) {
      return (
        <BottomNavigationAction
          className={classes.button}
          icon={<SvgIcon>{icon}</SvgIcon>}
          {...itemProps}
        />
      );
    }

    return (
      <Box
        borderTop={1}
        component="footer"
        className="footer"
        zIndex={1}
        {...props}
      >
        <BottomNavigation className="footer__navigation">
          {items.map(renderItem)}
        </BottomNavigation>
      </Box>
    );
  }

  const renderMemo = useMemo(render, [classes.button, items, props]);

  return renderMemo;
};

export default Footer;
