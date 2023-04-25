import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

const tagStyle = {
  padding: "2px 10px",
  backgroundColor: "white",
  borderRadius: "10px",
  color: "#7835E4",
};

const Tag = ({ title }: Props) => {
  return (
    <Box>
      <Typography sx={tagStyle}>{title}</Typography>
    </Box>
  );
};

export default Tag;
