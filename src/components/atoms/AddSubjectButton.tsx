import { Button } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import React from "react";

const ButtonStyle = {
  backgroundColor: "white",
  color: "#935BEF",
  borderColor: "#935BEF",
  border: "1px solid",
  borderRadius: "10px",
  cursor: "pointer",
  padding: "5px 10px 5px 10px",
  "&:hover": {
    backgroundColor: "#935BEF",
    color: "white",
    border: "1px solid transparent",
  },
};

interface Props {
  onClick: () => void;
}

const AddSubjectButton = ({ onClick }: Props) => {
  return (
    <Button sx={ButtonStyle} fullWidth onClick={onClick}>
      <IoMdAddCircleOutline />
      追加する
    </Button>
  );
};

export default AddSubjectButton;
