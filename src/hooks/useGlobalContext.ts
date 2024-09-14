import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error('Maybe GlobalContext is being used outside of GlobalProvider');
  }

  return globalContext;
};

export default useGlobalContext;
