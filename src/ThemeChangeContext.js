//Global Context State for managing Theme

import { createContext, useState } from "react";

export const ThemeChangeContext = createContext({
  theme: "light",
  themeHandler: () => {},
});

const ThemeChangeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const themeHandler = () => {
    setTheme((prevTheme) => !prevTheme);
  };
  const value = { themeHandler, theme };
  return (
    <ThemeChangeContext.Provider value={value}>
      {children}
    </ThemeChangeContext.Provider>
  );
};
export default ThemeChangeProvider;
