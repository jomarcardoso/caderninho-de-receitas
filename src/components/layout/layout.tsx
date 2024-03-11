import React, {
  FC,
  UIEvent,
  useState,
  useCallback,
  forwardRef,
  HTMLProps,
} from 'react';
import Header, { HeaderProps } from '../header/header';
import Main, { MainProps } from '../main';
import './layout.scss';
import Footer, { FooterProps } from '../footer/footer';
import { generateClasses } from '../../services/dom/classes';
import { isMobile } from '../../services/user-agent/user-agent.service';

export interface LayoutProps extends HTMLProps<HTMLDivElement> {
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  mainProps?: MainProps;
  footerMenu?: boolean;
}

const Layout: FC<LayoutProps> = forwardRef(
  (
    {
      children,
      showHeader = true,
      showFooter = true,
      headerProps,
      footerProps,
      footerMenu = false,
      mainProps,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const classes = generateClasses({
      layout: true,
      'layout--footer-menu': footerMenu,
      [className]: className,
    });

    const handleOpen = useCallback(
      (event: UIEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).scrollTop) {
          if (!open) {
            setOpen(true);
          }

          return;
        }

        if (open) {
          setOpen(false);
        }
      },
      [open],
    );

    return (
      <div className={classes} onScroll={handleOpen} {...props} ref={ref}>
        {showHeader && <Header {...headerProps} />}
        {footerMenu && <div className="layout__overlay" />}
        <Main className="layout__main" {...mainProps}>
          {children}
        </Main>
        {showFooter && isMobile() && (
          <Footer open={open} footerMenu={footerMenu} {...footerProps} />
        )}
      </div>
    );
  },
);

export default Layout;
