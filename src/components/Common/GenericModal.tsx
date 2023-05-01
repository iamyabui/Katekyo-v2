import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
interface Props {
  open: boolean;
  handleClose: () => void;
  handleAction: () => void;
  modalContent: JSX.Element;
  title: string;
  primaryButtonTitle: string;
  secondaryButtonTitle: string;
  loading: boolean;
}

const dialogTopStyle = {
  color: "white",
  backgroundColor: "#966ADD",
  paddingTop: "10px",
  paddingBottom: "10px",
  fontSize: "16px",
};

export default function GenericModal({
  open,
  handleClose,
  handleAction,
  modalContent,
  title,
  primaryButtonTitle,
  secondaryButtonTitle,
  loading,
}: Props) {
  return (
    <div>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={dialogTopStyle}>{title}</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions sx={{ gap: "10px" }}>
          <PrimaryButton
            handleAction={handleClose}
            title={primaryButtonTitle}
            loading={loading}
          />
          <SecondaryButton
            handleAction={handleAction}
            title={secondaryButtonTitle}
            loading={loading}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
