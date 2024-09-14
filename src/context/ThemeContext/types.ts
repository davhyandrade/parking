import { DefaultTheme } from 'styled-components';

export interface IStylesThemesProps {
  // tipagem do global style da biblioteca styled components
  theme: DefaultTheme;
}

export interface IThemeContext {
  // tipagem do contexto dos temas
  activeTheme: string | null;
  handleToggleTheme: () => void;
}
