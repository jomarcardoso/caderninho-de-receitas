import React, {
  FC,
  UIEvent,
  useState,
  useCallback,
  forwardRef,
  HTMLProps,
} from 'react';
import './layout.scss';
import Footer, { FooterProps } from '../footer/footer';
import { generateClasses } from '../../services/dom/classes';

export interface LayoutProps extends HTMLProps<HTMLDivElement> {
  showHeader?: boolean;
  showFooter?: boolean;
  footerProps?: FooterProps;
  mainProps?: HTMLProps<HTMLDivElement>;
  footerMenu?: boolean;
}

const Layout: FC<LayoutProps> = forwardRef(
  (
    {
      children,
      showHeader = true,
      showFooter = true,
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
        <div className="layout__content">
          <main className="layout__main" {...mainProps}>
            {children}
          </main>

          {showFooter && (
            <Footer open={open} footerMenu={footerMenu} {...footerProps} />
          )}
        </div>
      </div>
    );
  },
);

export default Layout;
