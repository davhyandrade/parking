import LogoIcon from '../assets/icons/LogoIcon';
import { ParkingOptionsButtons } from '../constants/ParkingOptionsButtons';
import useParkingContext from '../hooks/useParkingContext';
import ThemeButton from './ThemeButton';

export const Menu = () => {
  const { handleParkingOptions, activeParkingOptions } = useParkingContext();

  return (
    <header id="menu">
      <div className="position">
        <div>
          <LogoIcon />
          <hr />
          <ThemeButton />
        </div>
        <div>
          {ParkingOptionsButtons.map((item, id) => {
            return (
              <button
                onClick={() => handleParkingOptions(item.value)}  
                className={`${activeParkingOptions === item.value && 'active-button'} teste`}
                key={id}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
