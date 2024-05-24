import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const ThemeComponent = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default ThemeComponent;
