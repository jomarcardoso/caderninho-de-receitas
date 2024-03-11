import React, { FC, HTMLProps, ReactNode, useMemo } from 'react';
import './footer.scss';
import { generateClasses } from '../../services/dom/classes';
import { SemanticButton, SemanticButtonProps } from '../semantic-button';

export interface FooterItemProps extends SemanticButtonProps {
  icon?: ReactNode;
}

export interface FooterProps extends HTMLProps<HTMLDivElement> {
  items?: FooterItemProps[];
  footerMenu?: boolean;
  open?: boolean;
}

const Footer: FC<FooterProps> = ({
  items = [],
  footerMenu,
  open = false,
  children,
  ...props
}) => {
  const classes = generateClasses({
    footer: true,
    'footer--menu': footerMenu,
    'footer--open': open,
  });

  function render() {
    function renderItem({ icon, ...itemProps }: FooterItemProps) {
      return (
        <SemanticButton
          className="footer__control"
          key={String(icon)}
          {...itemProps}
        >
          <span className="svg-icon">{icon}</span>
        </SemanticButton>
      );
    }

    return (
      <footer className={classes} style={{ zIndex: 1 }} {...props}>
        {children || (
          <div className="footer__navigation">{items.map(renderItem)}</div>
        )}
      </footer>
    );
  }

  const renderMemo = useMemo(render, [children, classes, items, props]);

  return renderMemo;
};

export default Footer;
