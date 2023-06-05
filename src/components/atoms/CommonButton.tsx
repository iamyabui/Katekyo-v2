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
  disabled?: boolean;
}

const CommonButton = ({ title, onClick, disabled = false }: Props) => {
  return (
    <Box onClick={onClick}>
      <Button sx={ButtonStyle} disabled={disabled}>
        {title}
      </Button>
    </Box>
  );
};

export default CommonButton;
