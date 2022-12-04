import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box>
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    </Box>
  );
};

export default Loader;
