import { Box, Typography } from "@mui/material";
import React from "react";
import GenericModal from "./GenericModal";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleAction: () => void;
}

const EditCancelModal = ({ open, handleClose, handleAction }: Props) => {
  const modalContent = (
    <Box sx={{ paddingTop: "10px" }}>
      <Typography>
        キャンセルするとすべての編集内容がクリアされます。
      </Typography>
      <Typography>キャンセルしてよろしいですか？</Typography>
    </Box>
  );
  return (
    <GenericModal
      open={open}
      handleClose={handleClose}
      handleAction={handleAction}
      modalContent={modalContent}
      title="編集をキャンセル"
      primaryButtonTitle="編集画面に戻る"
      secondaryButtonTitle="編集を破棄"
      loading={false}
    />
  );
};

export default EditCancelModal;
