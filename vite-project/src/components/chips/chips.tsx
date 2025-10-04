import {
  type FC,
  type HTMLProps,
  createContext,
  useContext,
  useId,
} from 'react';
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

export interface ChipsProps extends HTMLProps<HTMLFieldSetElement> {
  full?: boolean;
  name: string;
  legend?: string;
}

export const Chips: FC<ChipsProps> = ({
  children,
  full,
  name = '',
  legend = '',
  ...props
}) => {
  const classes = generateClasses({
    chips: true,
    'mt-2': true,
    '-full': full,
  });

  return (
    <NameContext.Provider value={name}>
      <fieldset {...props}>
        <legend>{legend}</legend>
        <ul className={classes}>{children}</ul>
      </fieldset>
    </NameContext.Provider>
  );
};
