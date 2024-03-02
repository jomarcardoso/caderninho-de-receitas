import React, { FC, HTMLProps } from 'react';
import './notebook-tabs.scss';
import { generateCSSClasses } from '../../services/dom/classes';
import { NavLink } from 'react-router-dom';

interface NotebookTabProps extends HTMLProps<HTMLLIElement> {
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
          <NavLink
            to={link}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            {children}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NotebookTabs;
