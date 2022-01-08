import React, { FC, useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';
import Box, { BoxProps } from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import './footer.scss';

interface Props {
  items?: BottomNavigationActionProps[];
}

export type FooterProps = Props & BoxProps;

const Footer: FC<FooterProps> = ({ items = [], ...props }) => {
  function render() {
    function renderItem({ icon, ...itemProps }: BottomNavigationActionProps) {
      return (
        <BottomNavigationAction
          icon={<SvgIcon>{icon}</SvgIcon>}
          {...itemProps}
        />
      );
    }

    return (
      <Box
        boxShadow={4}
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

  const renderMemo = useMemo(render, [items, props]);

  return renderMemo;
};

export default Footer;
