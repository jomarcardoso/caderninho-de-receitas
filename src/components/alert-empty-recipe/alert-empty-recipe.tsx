import React, { FC } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogContentText, {
  DialogContentTextProps,
} from '@mui/material/DialogContentText';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';

interface Props {
  title: DialogTitleProps['children'];
  titleProps?: DialogTitleProps;
  content?: DialogContentProps['children'];
  contentProps?: DialogContentProps;
  contentText?: DialogContentTextProps['children'];
  contentTextProps?: DialogContentTextProps;
  actions: DialogActionsProps['children'];
  actionsProps?: DialogActionsProps;
}

export type AlertEmptyRecipeProps = Props & DialogProps;

const AlertEmptyRecipe: FC<AlertEmptyRecipeProps> = ({
  title = '',
  titleProps,
  content = '',
  contentProps,
  contentText = '',
  contentTextProps,
  actions = '',
  actionsProps,
  ...props
}) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title" {...titleProps}>
        {title}
      </DialogTitle>
      <DialogContent {...contentProps}>
        {content || (
          <DialogContentText
            id="alert-dialog-description"
            {...contentTextProps}
          >
            {contentText}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions {...actionsProps}>{actions}</DialogActions>
    </Dialog>
  );
};

export default AlertEmptyRecipe;
