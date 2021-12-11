import React, { FC, HTMLProps, ReactNode } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from '@mui/material/TextareaAutosize';
import './field.scss';

interface Props {
  rootProps?: HTMLProps<HTMLDivElement>;
  labelProps?: HTMLProps<HTMLLabelElement>;
  label: HTMLProps<HTMLLabelElement>['children'];
  multiline?: boolean;
  hint?: ReactNode;
}

export type FieldProps = TextareaAutosizeProps & Props;

const Field: FC<FieldProps> = ({
  multiline = false,
  labelProps,
  rootProps,
  label,
  hint = '',
  ...props
}) => {
  const { id: inputId } = props;

  let classes = 'field';

  if (multiline) {
    classes = `${classes} field--multiline`;
  }

  return (
    <div className={classes} {...rootProps}>
      <label className="field__label" htmlFor={inputId} {...labelProps}>
        {label}
      </label>
      <div className="field__box">
        <TextareaAutosize className="field__input" minRows={1} {...props} />
      </div>
      {hint && <div className="field__hint">{hint}</div>}
    </div>
  );
};

export default Field;
