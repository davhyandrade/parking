import { Dispatch, SetStateAction } from 'react';
import { ParkingOptions } from '../../@types/ParkingOptionsButtons';

export interface IGlobalContext {
  activeParkingOptions: ParkingOptions;
  handleParkingOptions: (value: ParkingOptions) => void;
  pageWidth: number;
  isActiveHamburgerMenuButton: boolean;
  setIsActiveHamburgerMenuButton: Dispatch<SetStateAction<boolean>>;
}
