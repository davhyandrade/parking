import { useContext } from "react";
import { ParkingContext } from "../context/ParkingContext";

const useParkingContext = () => {
  const parkingContext = useContext(ParkingContext);

  if (!parkingContext) {
    throw new Error('Maybe ParkingContext is being used outside of ParkingProvider')
  }

  return parkingContext;
}

export default useParkingContext;
