import React, { FC, HTMLProps } from 'react';
import './notebook-tabs.scss';
import { generateClasses } from '../../services/dom/classes';

interface NotebookTabProps extends HTMLProps<HTMLLIElement> {
  link?: string;
}

export interface NotebookTabsProps extends HTMLProps<HTMLDivElement> {
  tabs: NotebookTabProps[];
}

const NotebookTabs: FC<NotebookTabsProps> = ({
  tabs = [],
  className = '',
  ...props
}) => {
  const classes = generateClasses({
    'notebook-tabs': true,
    [className]: className,
  });

  return (
    <nav className={classes} {...props}>
      <ul>
        {tabs.map(({ children, link = '#', ...tabProps }) => (
          <li key={String(children)} {...tabProps}>
            <a href="#">{children}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NotebookTabs;
