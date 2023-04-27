import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

const Tag = ({ title, selected = false, onClick }: Props) => {
  const tagStyle = {
    padding: "2px 10px",
    backgroundColor: selected ? "#7835E4" : "#D8D8D8",
    borderRadius: "10px",
    color: selected ? "#FFFFFF" : "#7835E4",
    cursor: onClick ? "pointer" : "default",
  };

  return (
    <Box onClick={onClick} sx={{ display: "flex" }}>
      <Typography sx={tagStyle}>{title}</Typography>
    </Box>
  );
};

export default Tag;
