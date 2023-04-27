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
        <DialogTitle sx={dialogTopStyle}>{"担当科目の選択"}</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions sx={{ gap: "10px" }}>
          <PrimaryButton handleAction={handleClose} title="キャンセル" />
          <SecondaryButton handleAction={handleAction} title="保存" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
