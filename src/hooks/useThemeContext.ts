import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Maybe ThemeContext is being used outside of ThemeProvider');
  }

  return themeContext;
};

export default useThemeContext;
