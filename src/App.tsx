import { Outlet } from 'react-router-dom';
import useThemeContext from './hooks/useThemeContext';
import ParkingProvider from './context/ParkingContext';

function App() {
  const { activeTheme } = useThemeContext();

  return (
    <div id="app" data-theme={activeTheme}>
      <ParkingProvider>
        <Outlet />
      </ParkingProvider>
    </div>
  );
}

export default App;
