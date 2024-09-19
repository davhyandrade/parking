import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import App from '../layout/App';
import Loading from '../components/Loading';
import BackIcon from '../assets/icons/BackIcon';
import useGlobalContext from '../hooks/useGlobalContext';
import { ParkingOptions } from '../constants/ParkingOptionsButtons';
import ReservationCard from '../components/reservation/ReservationCard';
import { IReservation } from '../@types/Reservation';
import ReservationField from '../components/reservation/ReservationField';

const Reservations = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleToggleParkingOptions } = useGlobalContext();

  const handleBackButton = () => {
    if (reservationData) {
      return setReservationData(null); // desativar reservation field component
    }

    return navigate('/');
  };

  const fetch = useFetch({
    url: `https://parking-lot-to-pfz.herokuapp.com/parking/${id}`,
    method: 'GET',
  });

  useEffect(() => {
    if (fetch.error) navigate('/');
  }, [fetch.error]);

  useEffect(() => {
    handleToggleParkingOptions(ParkingOptions.RESERVATIONS); 
  }, []);

  const [reservationData, setReservationData] = useState<IReservation | null>(null);

  return (
    fetch.data && (
      <App>
        <section id="reservations-page">
          <div className="position">
            {fetch.loading ? (
              <Loading name="carregando" />
            ) : fetch.data.length === 0 ? (
              <div id="warning-not-found">
                <span>
                  Reservas não encontradas referente a Placa <b>{id}</b>!
                </span>
                <Link to={'/'}>Voltar</Link>
              </div>
            ) : (
              <>
                <div className="header">
                  <button onClick={handleBackButton}>
                    <BackIcon />
                  </button>
                  {!reservationData && <h1>Placa {id?.toUpperCase()}</h1>}
                </div>
                {reservationData ? ( // verificar se e para listar todos ou so uma reserva
                  <ReservationField item={reservationData} />
                ) : (
                  <div id="reservations-field">
                    {fetch.data
                      .sort((a: any, b: any) => a.paid - b.paid)
                      .map((item: IReservation) => {
                        return (
                          <ReservationCard key={item.reservation} item={item} setReservationData={setReservationData} />
                        );
                      })}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </App>
    )
  );
};

export default Reservations;
