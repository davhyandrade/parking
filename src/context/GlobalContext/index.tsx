import { createContext, useEffect, useState } from 'react';
import { IComponentProps } from '../../@types/ComponentProps';
import { IGlobalContext } from './types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypeParkingOptions } from '../../@types/ParkingOptionsButtons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ParkingOptions } from '../../constants/ParkingOptionsButtons';

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider = ({ children }: IComponentProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeParkingOptions, setActiveParkingOptions] = useState<TypeParkingOptions>(ParkingOptions.ENTRY);

  const handleParkingOptions = (value: TypeParkingOptions) => {
    setActiveParkingOptions(value);

    if (value !== ParkingOptions.RESERVATIONS && location.pathname !== '/') navigate('/');
  };

  const [pageWidth, setPageWidth] = useState<number>(0);

  useEffect(() => {
    setPageWidth(window.innerWidth);
  }, []);

  const [isActiveHamburgerMenuButton, setIsActiveHamburgerMenuButton] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        activeParkingOptions,
        handleParkingOptions,
        pageWidth,
        isActiveHamburgerMenuButton,
        setIsActiveHamburgerMenuButton,
      }}
    >
      {children}
      <ToastContainer />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
