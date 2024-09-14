import { ParkingOptions } from "../../@types/ParkingOptionsButtons";

export interface IParkingContext {
  activeParkingOptions: ParkingOptions;
  handleParkingOptions: (value: ParkingOptions) => void;
}