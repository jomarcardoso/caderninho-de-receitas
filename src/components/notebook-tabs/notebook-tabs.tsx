import React, { FC, HTMLProps } from 'react';
import './notebook-tabs.scss';
import { Link } from 'gatsby';
import { generateCSSClasses } from '../../services/dom/classes';

interface NotebookTabProps extends HTMLProps<HTMLLIElement> {
  active?: boolean;
  link?: string;
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
      {tabs.map(({ children, active, link = '#', ...tabProps }) => (
        <li key={String(children)} {...tabProps}>
          <Link to={link} className={active ? 'active' : ''}>
            {children}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotebookTabs;
