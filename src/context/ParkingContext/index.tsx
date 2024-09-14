import { createContext, useState } from "react";
import { IComponentProps } from "../../@types/ComponentProps";
import { IParkingContext } from "./types";
import { ParkingOptions } from "../../@types/ParkingOptionsButtons";

export const ParkingContext = createContext<IParkingContext | null>(null);

const ParkingProvider = ({ children }: IComponentProps) => {
  const [activeParkingOptions, setActiveParkingOptions] = useState<ParkingOptions>("entry");

  const handleParkingOptions = (value: ParkingOptions) => {
    setActiveParkingOptions(value);
  }

  return (
    <ParkingContext.Provider value={{ activeParkingOptions, handleParkingOptions }}>
      {children}
    </ParkingContext.Provider>
  )
}

export default ParkingProvider;