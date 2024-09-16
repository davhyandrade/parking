import { createGlobalStyle } from 'styled-components';
import { ParkingOptionsButtons } from '../../constants/ParkingOptionsButtons';
import useGlobalContext from '../../hooks/useGlobalContext';

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const MobileMenu = () => {
  const { handleParkingOptions, activeParkingOptions, setIsActiveHamburgerMenuButton } = useGlobalContext();

  return (
    <>
      <GlobalStyles />
      <div id="mobile-menu">  
        <div className="position">
          {ParkingOptionsButtons.map((item, id) => {
            return (
              <button
                onClick={() => [
                  handleParkingOptions(item.value),
                  setTimeout(() => {
                    setIsActiveHamburgerMenuButton(false);
                  }, 1000), // desativando o menu mobile
                ]}
                className={`${activeParkingOptions === item.value && 'active-button'}`}
                key={id}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
