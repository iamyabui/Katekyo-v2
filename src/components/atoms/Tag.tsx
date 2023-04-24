import { Box, Typography } from "@mui/material";
import React from "react";

const tagStyle = {
  paddingLeft: "5px",
  paddingRight: "5px",
  backgroundColor: "#D8D8D8",
  borderRadius: "10px",
  color: "#7835E4",
};

const Tag = () => {
  return (
    <Box>
      <Typography sx={tagStyle}>#数学</Typography>
    </Box>
  );
};

export default Tag;
