import React, { FC, HTMLProps, createContext, useContext, useId } from 'react';
import './chips.scss';
import { generateClasses } from '../../services/dom/classes';

const NameContext = createContext<string>('');

export const Chip: FC<HTMLProps<HTMLInputElement>> = ({
  children,
  ...props
}) => {
  const id = useId();
  const name = useContext(NameContext);

  return (
    <li className="chip">
      <input type="radio" name={name} {...props} id={id} />
      <label htmlFor={id}>{children}</label>
    </li>
  );
};

export interface ChipsProps extends HTMLProps<HTMLUListElement> {
  full?: boolean;
  name: string;
}

export const Chips: FC<ChipsProps> = ({
  children,
  className = '',
  full,
  name = '',
  ...props
}) => {
  const classes = generateClasses({
    chips: true,
    [className]: className,
    '-full': full,
  });
  return (
    <NameContext.Provider value={name}>
      <ul className={classes} {...props}>
        {children}
      </ul>
    </NameContext.Provider>
  );
};
