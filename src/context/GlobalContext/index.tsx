import { createContext, useEffect, useState } from 'react';
import { IComponentProps } from '../../@types/ComponentProps';
import { IGlobalContext } from './types';
import { ParkingOptions } from '../../@types/ParkingOptionsButtons';

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider = ({ children }: IComponentProps) => {
  const [activeParkingOptions, setActiveParkingOptions] = useState<ParkingOptions>('entry');

  const handleParkingOptions = (value: ParkingOptions) => {
    setActiveParkingOptions(value);
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
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
