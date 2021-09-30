import React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box className="loader">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
