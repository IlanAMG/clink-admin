import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modale = ({
  isOpen,
  close,
  title,
  content,
  actions,
  disabled,
  children,
  ...props
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent {...props}>
        {content ? (
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{props.cancelText || "Cancel"}</Button>
        {actions.map((action) => {
          if (action.custom) return action.custom;
          return (
            <Button
              disabled={disabled}
              key={action.title}
              onClick={action.click}
            >
              {action.title}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};
