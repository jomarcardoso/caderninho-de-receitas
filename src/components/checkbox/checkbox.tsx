import React, { FC, HTMLProps } from 'react';
import { generateClasses } from '../../services/dom/classes';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import './checkbox.scss';

export const Checkbox: FC<HTMLProps<HTMLInputElement>> = ({
  className = '',
  ...props
}) => {
  const { checked, defaultChecked } = props;
  const classes = generateClasses({
    checkbox: true,
    [className]: className,
  });

  return (
    <span className={classes}>
      <input type="checkbox" {...props} />
      <span className="checked-icon svg-icon large">
        <IoCheckboxOutline />
      </span>

      <span className="not-checked-icon svg-icon large">
        <IoSquareOutline />
      </span>
    </span>
  );
};
