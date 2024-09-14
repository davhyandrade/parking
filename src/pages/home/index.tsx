import { ParkingOptionsButtons } from '../../constants/ParkingOptionsButtons';
import useParkingContext from '../../hooks/useParkingContext';
import App from '../../layout/App';

const Home = () => {
  const { activeParkingOptions, handleParkingOptions } = useParkingContext();

  return (
    <App>
      <div id="home">
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
        </div>
      </div>
    </App>
  );
};

export default Home;
