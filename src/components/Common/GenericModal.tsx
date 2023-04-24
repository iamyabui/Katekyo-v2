import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const dialogTopStyle = {
  color: "white",
  backgroundColor: "#966ADD",
  paddingTop: "10px",
  paddingBottom: "10px",
  fontSize: "16px",
};

const dialogContent = {
  marginTop: "10px",
};

export default function GenericModal({ open, handleClose }: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={dialogTopStyle}>{"担当科目の選択"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={dialogContent}>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ gap: "10px" }}>
          <PrimaryButton handleAction={handleClose} title="キャンセル" />
          <SecondaryButton handleAction={handleClose} title="保存" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
