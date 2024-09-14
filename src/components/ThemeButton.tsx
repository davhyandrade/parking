import { MoonIcon } from '../assets/icons/MoonIcon';
import { SunIcon } from '../assets/icons/SunIcon';
import useThemeContext from '../hooks/useThemeContext';

const ThemeButton = () => {
  const { handleToggleTheme, activeTheme } = useThemeContext();

  return (
    <button id="theme-button" onClick={handleToggleTheme}>
      {activeTheme === 'dark' ? (
        <>
          <span>Modo Escuro</span>
          <MoonIcon />
        </>
      ) : (
        activeTheme === 'light' && (
          <>
            <span>Modo Claro</span>
            <SunIcon />
          </>
        )
      )}
    </button>
  );
};

export default ThemeButton;
