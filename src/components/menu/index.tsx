import LogoIcon from '../../assets/icons/LogoIcon';
import { ParkingOptionsButtons } from '../../constants/ParkingOptionsButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import ThemeButton from '../ThemeButton';
import MobileMenu from './MobileMenu';

export const Menu = () => {
  const {
    handleParkingOptions,
    activeParkingOptions,
    pageWidth,
    isActiveHamburgerMenuButton,
    setIsActiveHamburgerMenuButton,
  } = useGlobalContext();

  const handleToggleHamburgerMenuButton = () => {
    const newButtonValue: boolean = isActiveHamburgerMenuButton ? false : true;

    return setIsActiveHamburgerMenuButton(newButtonValue);
  };

  return (
    <>
      <header id="menu">
        <div className="position">
          <div>
            <LogoIcon />
            <hr />
            <ThemeButton />
          </div>
          <div>
            {pageWidth > 800 ? (
              ParkingOptionsButtons.map((item, id) => {
                return (
                  <button
                    onClick={() => handleParkingOptions(item.value)}
                    className={`${activeParkingOptions === item.value && 'active-button'}`}
                    key={id}
                  >
                    {item.name}
                  </button>
                );
              })
            ) : (
              <div
                onClick={handleToggleHamburgerMenuButton}
                id="hamburger-menu-button"
                className={`${isActiveHamburgerMenuButton ? 'active-button' : 'button-not-active'}`}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </header>
      {isActiveHamburgerMenuButton && <MobileMenu />}
    </>
  );
};
