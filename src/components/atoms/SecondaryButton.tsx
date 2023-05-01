import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

const ButtonStyle = {
  backgroundColor: "white",
  color: "#935BEF",
  borderColor: "#935BEF",
  border: "1px solid",
  borderRadius: "10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#935BEF",
    color: "white",
    border: "1px solid transparent",
  },
};

interface Props {
  title: string;
  handleAction: () => void;
  loading: boolean;
}

const SecondaryButton = ({ title, handleAction, loading }: Props) => {
  return !loading ? (
    <Box onClick={handleAction}>
      <Button sx={ButtonStyle}>{title}</Button>
    </Box>
  ) : (
    <Button sx={ButtonStyle}>
      <CircularProgress color="secondary" size={25} />
    </Button>
  );
};

export default SecondaryButton;
