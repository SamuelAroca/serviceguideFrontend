import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

// No se usa <CssBaseline /> a proposito: el proyecto ya trae su propio
// reset global en index.css (background/color del body via variables CSS)
// y modulos CSS por pagina. CssBaseline pisaria esos valores con los suyos
// propios (background.default de MUI) y cambiaria box-sizing/tipografia
// en toda la app, no solo donde se necesita el modo oscuro.

const ThemeContext = createContext();

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (err) {
    // localStorage puede no estar disponible (modo privado, storage
    // bloqueado); en ese caso simplemente se usa la preferencia del sistema.
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

// Provee el modo claro/oscuro a toda la app: guarda la eleccion en
// localStorage, la aplica como data-theme en <html> (de ahi la leen las
// variables CSS de index.css y los styled-components), y sincroniza el
// ThemeProvider de MUI para que TextField/Button/Table/Alert/etc. tambien
// respondan sin tener que tocarlos uno por uno.
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // Sin persistencia si el storage esta bloqueado; el toggle sigue
      // funcionando durante la sesion.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeMode = () => useContext(ThemeContext);

export { ThemeContextProvider, useThemeMode };
