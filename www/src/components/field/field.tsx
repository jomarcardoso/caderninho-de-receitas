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
  useMemo,
  useCallback,
  FocusEventHandler,
  FocusEvent,
} from 'react';
import {
  TextareaAutosize,
  TextareaAutosizeProps,
} from '@mui/base/TextareaAutosize';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './field.scss';
import { generateClasses } from '../../services/dom/classes';

interface Props {
  rootProps?: HTMLProps<HTMLDivElement>;
  labelProps?: HTMLProps<HTMLLabelElement>;
  label?: HTMLProps<HTMLLabelElement>['children'];
  multiline?: boolean;
  breakline?: boolean;
  hint?: ReactNode;
  onErase?(): void;
  size?: 'large';
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
  className = '',
  size,
  ...props
}) => {
  const { id: inputId, onBlur, onFocus } = props;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const classes = generateClasses({
    field: true,
    'field--large': size === 'large',
    'field--multiline': multiline,
    'field--focused': focused,
    'field--no-label': !label,
    'field--no-erasable': !onErase,
    'field--no-breakline': !breakline,
    [className]: className,
  });

  const handleChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    (event) => {
      if (props.onChange) {
        props.onChange(
          event as ChangeEvent<HTMLTextAreaElement> &
            FormEvent<HTMLInputElement>,
        );
      }
    },
    [props],
  );

  const handleFocus = useCallback((event: Event) => {
    onFocus?.(event as any);
    setFocused(true);
  }, []);

  const handleBlur = useCallback((event: Event) => {
    onBlur?.(event as any);
    setFocused(false);
  }, []);

  const memoizedInput = useMemo(
    () => (
      <input
        type="text"
        className="field__input"
        {...(props as HTMLProps<HTMLInputElement>)}
        onFocus={handleFocus as any}
        onBlur={handleBlur as any}
        onChange={handleChange}
        ref={inputRef}
      />
    ),
    [handleChange, props],
  );

  const memoizedTextarea = useMemo(
    () => (
      <TextareaAutosize
        className="field__input"
        minRows={1}
        {...(props as TextareaAutosizeProps)}
        onFocus={handleFocus as any}
        onBlur={handleBlur as any}
        onChange={handleChange}
      />
    ),
    [handleChange, props],
  );

  const memoizedRender = useMemo(
    () => (
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
          {breakline ? memoizedTextarea : memoizedInput}
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
    ),
    [
      breakline,
      classes,
      hint,
      inputId,
      label,
      labelProps,
      memoizedInput,
      memoizedTextarea,
      onErase,
      props.value,
      rootProps,
    ],
  );

  return memoizedRender;
};

export default Field;
