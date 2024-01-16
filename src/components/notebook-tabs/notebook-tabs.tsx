import React, { FC, HTMLProps } from 'react';
import './notebook-tabs.scss';
import { generateCSSClasses } from '../../services/dom/classes';

interface NotebookTabProps extends HTMLProps<HTMLLIElement> {
  active?: boolean;
}

export interface NotebookTabsProps extends HTMLProps<HTMLUListElement> {
  tabs: NotebookTabProps[];
}

const NotebookTabs: FC<NotebookTabsProps> = ({
  tabs = [],
  className = '',
  ...props
}) => {
  const classes = generateCSSClasses({
    'notebook-tabs': true,
    [className]: className,
  });

  return (
    <ul className={classes} {...props}>
      {tabs.map(({ children, active, ...tabProps }) => (
        <li
          key={String(children)}
          className={active ? 'active' : ''}
          {...tabProps}
        >
          {children}
        </li>
      ))}
    </ul>
  );
};

export default NotebookTabs;
