import { Box } from "@mui/material";
import React from "react";

const BoxStyle = {
  backgroundColor: "#B575F4",
  color: "white",
  padding: "5px",
  paddingLeft: "20px",
};

const Header = () => {
  return (
    <Box sx={BoxStyle}>
      <p>KATEKYO</p>
    </Box>
  );
};

export default Header;
