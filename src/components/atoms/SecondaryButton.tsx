import { Button } from "@mui/material";
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
}

const SecondaryButton = ({ title, handleAction }: Props) => {
  return (
    <Button sx={ButtonStyle} onClick={handleAction}>
      {title}
    </Button>
  );
};

export default SecondaryButton;
