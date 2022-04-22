import React, {
  FC,
  HTMLProps,
  ReactNode,
  useState,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
} from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from '@mui/material/TextareaAutosize';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './field.scss';

interface Props {
  rootProps?: HTMLProps<HTMLDivElement>;
  labelProps?: HTMLProps<HTMLLabelElement>;
  label?: HTMLProps<HTMLLabelElement>['children'];
  multiline?: boolean;
  breakline?: boolean;
  hint?: ReactNode;
  onErase?(): void;
}

export type FieldProps = (TextareaAutosizeProps | HTMLProps<HTMLInputElement>) &
  Props;

const Field: FC<FieldProps> = ({
  multiline = false,
  breakline = true,
  onErase,
  labelProps,
  rootProps,
  label,
  hint = '',
  ...props
}) => {
  const { id: inputId } = props;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  let classes = 'field';

  if (multiline) {
    classes = `${classes} field--multiline`;
  }

  if (focused) {
    classes = `${classes} field--focused`;
  }

  if (!label) {
    classes = `${classes} field--no-label`;
  }

  if (!onErase) {
    classes = `${classes} field--no-erasable`;
  }

  if (!breakline) {
    classes = `${classes} field--no-breakline`;
  }

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    if (props.onChange) {
      props.onChange(
        event as ChangeEvent<HTMLTextAreaElement> & FormEvent<HTMLInputElement>,
      );
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
      {label && (
        <label className="field__label" htmlFor={inputId} {...labelProps}>
          {label}
        </label>
      )}
      <label htmlFor={inputId} className="field__box">
        {breakline ? (
          <TextareaAutosize
            className="field__input"
            minRows={1}
            {...(props as TextareaAutosizeProps)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            className="field__input"
            {...(props as HTMLProps<HTMLInputElement>)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            ref={inputRef}
          />
        )}
        {onErase && (props.value || inputRef?.current?.value) && (
          <button
            className="field__action"
            type="button"
            onClick={() => onErase()}
          >
            <IoCloseCircleOutline className="field__icon" />
          </button>
        )}
      </label>
      {hint && <div className="field__hint">{hint}</div>}
    </div>
  );
};

export default Field;
