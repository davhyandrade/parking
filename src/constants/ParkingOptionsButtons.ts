import { IParkingOptionsButtons } from '../@types/ParkingOptionsButtons';

export enum ParkingOptions {
  ENTRY = 'entry',
  EXIT = 'exit',
  RESERVATIONS = 'reservations',
}

export const ParkingOptionsButtons: IParkingOptionsButtons[] = [
  {
    name: 'Entrada',
    value: ParkingOptions.ENTRY,
  },
  {
    name: 'Saída',
    value: ParkingOptions.EXIT,
  },
];
