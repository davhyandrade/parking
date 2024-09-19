import { useEffect } from 'react';
import EntryForm from '../components/forms/EntryForm';
import ExitForm from '../components/forms/ExitForm';
import { ParkingOptions, ParkingOptionsButtons } from '../constants/ParkingOptionsButtons';
import useGlobalContext from '../hooks/useGlobalContext';
import App from '../layout/App';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { activeParkingOptions, handleToggleParkingOptions } = useGlobalContext();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== ParkingOptions.ENTRY && location.pathname !== ParkingOptions.EXIT)
      handleToggleParkingOptions(ParkingOptions.ENTRY); // resetando para o valor padrao
  }, [location.pathname]);

  return (
    <App>
      <section id="home">
        <div className="position">
          <header className="header">
            {ParkingOptionsButtons.map((item, id) => {
              return (
                <button
                  onClick={() => handleToggleParkingOptions(item.value)}
                  className={`${activeParkingOptions === item.value && 'active-button'}`}
                  key={id}
                >
                  {item.name}
                </button>
              );
            })}
          </header>
          {activeParkingOptions === ParkingOptions.ENTRY ? (
            <EntryForm />
          ) : (
            activeParkingOptions === ParkingOptions.EXIT && <ExitForm />
          )}
        </div>
      </section>
    </App>
  );
};

export default Home;
