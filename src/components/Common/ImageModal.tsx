import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { uploadImage } from "../../utils/UploadImage";
import GenericModal from "./GenericModal";

interface Props {
  imageModalOpen: boolean;
  setImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  imageURL: string;
}

const dialogBox = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "50px",
};

export const ImageModal = ({
  imageModalOpen,
  setImageModalOpen,
  id,
  setImageURL,
  imageURL,
}: Props) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(imageURL);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setAvatarSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (selectedFile)
      uploadImage(id, selectedFile, setFileLoading).then((downloadUrl) => {
        setImageURL(downloadUrl);
        setImageModalOpen(false);
      });
  };

  const handleClose = () => {
    setImageModalOpen(false);
  };

  const modalContent = (
    <form>
      <Box sx={dialogBox}>
        <Avatar
          src={avatarSrc}
          alt="User Image"
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: "20px" }}
        >
          ファイルを選択する
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </Button>
      </Box>
    </form>
  );

  return (
    <GenericModal
      open={imageModalOpen}
      handleClose={handleClose}
      handleAction={handleSubmit}
      modalContent={modalContent}
      title="写真を変更"
      primaryButtonTitle="キャンセル"
      secondaryButtonTitle="保存"
      loading={fileLoading}
    />
  );
};
