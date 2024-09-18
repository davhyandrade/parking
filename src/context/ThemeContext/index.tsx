import { createContext, useEffect, useState } from 'react';
import { IComponentProps } from '../../@types/ComponentProps';
import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { DarkTheme } from '../../themes/Dark';
import { IThemeContext, IStylesThemesProps } from './types';
import { LightTheme } from '../../themes/Light';

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const GlobalThemesStyles = createGlobalStyle<IStylesThemesProps>`
 :root {
    ${({ theme }) =>
      theme.colors.map(
        ({ name, value }: DefaultTheme) => `--${name}: ${value};`
      )}}; /* mapeia o objeto do tema e define variáveis css */
  }
`;

const ThemeProvider = ({ children }: IComponentProps) => {
  const theme: string | null = localStorage.getItem('theme');

  const [activeTheme, setactiveTheme] = useState<string | null>(theme);

  const handleToggleTheme = () => {
    if (activeTheme === 'dark') localStorage.setItem('theme', 'light');

    if (activeTheme === 'light') localStorage.setItem('theme', 'dark');

    if (!activeTheme) localStorage.setItem('theme', 'light');

    const theme: string | null = localStorage.getItem('theme');

    setactiveTheme(theme);
  };

  const [themeData, setThemeData] = useState<DefaultTheme>(DarkTheme);

  useEffect(() => {
    if (!activeTheme) handleToggleTheme();

    if (activeTheme === 'dark') {
      setThemeData(DarkTheme);
    }
    if (activeTheme === 'light') {
      setThemeData(LightTheme);
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, handleToggleTheme }}>
      <GlobalThemesStyles theme={themeData} />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
