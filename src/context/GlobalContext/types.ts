import { Dispatch, SetStateAction } from 'react';
import { TypeParkingOptions } from '../../@types/ParkingOptionsButtons';

export interface IGlobalContext {
  activeParkingOptions: TypeParkingOptions;
  handleParkingOptions: (value: TypeParkingOptions) => void;
  pageWidth: number;
  isActiveHamburgerMenuButton: boolean;
  setIsActiveHamburgerMenuButton: Dispatch<SetStateAction<boolean>>;
}
