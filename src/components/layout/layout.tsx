import React, {
  FC,
  UIEvent,
  useState,
  useCallback,
  forwardRef,
  HTMLProps,
  useEffect,
} from 'react';
import './layout.scss';
import Footer, { FooterProps } from '../footer/footer';
import { generateClasses } from '../../services/dom/classes';
import NotebookTabs, {
  NotebookTabsProps,
} from '../notebook-tabs/notebook-tabs';
import { htmxScrollspy } from 'ovos';

export interface LayoutProps extends HTMLProps<HTMLDivElement> {
  showHeader?: boolean;
  showFooter?: boolean;
  footerProps?: FooterProps;
  mainProps?: HTMLProps<HTMLDivElement>;
  footerMenu?: boolean;
  tabs?: NotebookTabsProps['tabs'];
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
      tabs = [],
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const classes = generateClasses({
      layout: true,
      'paper-bg': true,
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

    useEffect(() => {
      htmxScrollspy();
    }, []);

    return (
      <div
        className={classes}
        onScroll={handleOpen}
        {...props}
        ref={ref}
        ovo-scrollspy
      >
        <div className="layout__content">
          <main className="layout__main" {...mainProps}>
            {children}
          </main>

          <NotebookTabs tabs={tabs} />

          {showFooter && (
            <Footer open={open} footerMenu={footerMenu} {...footerProps} />
          )}
        </div>
      </div>
    );
  },
);

export default Layout;
