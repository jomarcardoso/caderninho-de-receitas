import React, { FC, HTMLProps, ReactNode } from 'react';
import { Modal, ModalProps } from '@mui/base/Modal';
import { FocusTrap } from '@mui/base';

export interface AlertEmptyRecipeProps extends Omit<ModalProps, 'children'> {
  titleProps?: HTMLProps<HTMLHeadingElement>;
  contentProps?: HTMLProps<HTMLDivElement>;
  actions: ReactNode;
  actionsProps?: HTMLProps<HTMLDivElement>;
  children?: ReactNode;
}

const Dialog: FC<AlertEmptyRecipeProps> = ({
  title = '',
  titleProps,
  children = '',
  contentProps,
  actions = '',
  actionsProps,
  ...props
}) => {
  return (
    <Modal className="modal-overlay" {...props}>
      <>
        <div className="modal-backdrop" />
        <FocusTrap open>
          <div className="modal-container">
            <section
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="modal"
              role="dialog"
            >
              <h2
                className="modal__title"
                id="alert-dialog-title"
                {...titleProps}
              >
                {title}
              </h2>

              {children && (
                <div
                  className="modal__content"
                  id="alert-dialog-description"
                  {...contentProps}
                >
                  {children}
                </div>
              )}
              <div className="modal__footer" {...actionsProps}>
                {actions}
              </div>
            </section>
          </div>
        </FocusTrap>
      </>
    </Modal>
  );
};

export default Dialog;
