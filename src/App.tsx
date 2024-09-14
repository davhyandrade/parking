import { Outlet } from 'react-router-dom';
import useThemeContext from './hooks/useThemeContext';
import GlobalProvider from './context/GlobalContext';

function App() {
  const { activeTheme } = useThemeContext();

  return (
    <div id="app" data-theme={activeTheme}>
      <GlobalProvider>
        <Outlet />
      </GlobalProvider>
    </div>
  );
}

export default App;
