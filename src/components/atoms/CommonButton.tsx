import { Box, Button } from "@mui/material";
import React from "react";

const ButtonStyle = {
  backgroundColor: "#935BEF",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "white",
    color: "#935BEF",
    borderColor: "#935BEF",
    border: "1px solid",
  },
};

interface Props {
  title: string;
  onClick: () => void;
}

const CommonButton = ({ title, onClick }: Props) => {
  return (
    <Box onClick={onClick}>
      <Button sx={ButtonStyle}>{title}</Button>
    </Box>
  );
};

export default CommonButton;
