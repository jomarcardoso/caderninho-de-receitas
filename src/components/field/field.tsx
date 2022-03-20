import React, {
  FC,
  HTMLProps,
  ReactNode,
  useState,
  ChangeEventHandler,
} from 'react';
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
  const [focused, setFocused] = useState(false);

  let classes = 'field';

  if (multiline) {
    classes = `${classes} field--multiline`;
  }

  if (focused) {
    classes = `${classes} field--focused`;
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className={classes} {...rootProps}>
      <img
        src="/images/textures/linned-sheet-texture.svg"
        alt=""
        width="0"
        height="0"
      />
      <label className="field__label" htmlFor={inputId} {...labelProps}>
        {label}
      </label>
      <label htmlFor={inputId} className="field__box">
        <TextareaAutosize
          className="field__input"
          minRows={1}
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        />
      </label>
      {hint && <div className="field__hint">{hint}</div>}
    </div>
  );
};

export default Field;
