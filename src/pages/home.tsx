import EntryForm from '../components/forms/EntryForm';
import ExitForm from '../components/forms/ExitForm';
import { ParkingOptionsButtons } from '../constants/ParkingOptionsButtons';
import useGlobalContext from '../hooks/useGlobalContext';
import App from '../layout/App';

const Home = () => {
  const { activeParkingOptions, handleParkingOptions } = useGlobalContext();

  return (
    <App>
      <section id="home">
        <div className="position">
          <header className="header">
            {ParkingOptionsButtons.map((item, id) => {
              return (
                <button
                  onClick={() => handleParkingOptions(item.value)}
                  className={`${activeParkingOptions === item.value && 'active-button'}`}
                  key={id}
                >
                  {item.name}
                </button>
              );
            })}
          </header>
          {activeParkingOptions === 'entry' ? <EntryForm /> : activeParkingOptions === 'exit' && <ExitForm />}
        </div>
      </section>
    </App>
  );
};

export default Home;
