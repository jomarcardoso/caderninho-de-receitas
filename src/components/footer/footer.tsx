import React, { FC, useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';
import Box, { BoxProps } from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import './footer.scss';
import { generateCSSClasses } from '../../services/dom/classes';

interface Props {
  items?: BottomNavigationActionProps[];
  footerMenu?: boolean;
  open?: boolean;
}

export type FooterProps = Props & BoxProps;

const Footer: FC<FooterProps> = ({
  items = [],
  footerMenu,
  open = false,
  children,
  ...props
}) => {
  const classes = generateCSSClasses({
    footer: true,
    'footer--menu': footerMenu,
    'footer--open': open,
  });

  function render() {
    function renderItem({ icon, ...itemProps }: BottomNavigationActionProps) {
      console.log(icon);

      return (
        <BottomNavigationAction
          key={String(icon)}
          icon={<SvgIcon>{icon}</SvgIcon>}
          {...itemProps}
        />
      );
    }

    return (
      <Box
        boxShadow={4}
        component="footer"
        className={classes}
        zIndex={1}
        {...props}
      >
        {children || (
          <BottomNavigation className="footer__navigation">
            {items.map(renderItem)}
          </BottomNavigation>
        )}
      </Box>
    );
  }

  const renderMemo = useMemo(render, [children, classes, items, props]);

  return renderMemo;
};

export default Footer;
