import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import App from '../layout/App';
import Loading from '../components/Loading';
import BackIcon from '../assets/icons/BackIcon';
import useGlobalContext from '../hooks/useGlobalContext';
import { ParkingOptions } from '../constants/ParkingOptionsButtons';

interface IReserve {
  left: boolean;
  paid: boolean;
  plate: string;
  reservation: string;
  time: string;
}

const Reservations = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleParkingOptions } = useGlobalContext();

  const handleBackButton = () => {
    if (reserveData) {
      return setReserveData(null);
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

  const formatTimeToPortuguese = (time: string): string => {
    // converter as palavras do inglês para o português
    const formattedTime = time
      .replace(/seconds?/gi, (match) => (match === 'second' ? 'segundo' : 'segundos'))
      .replace(/hours?/gi, 'h')
      .replace(/minutes?/gi, 'min')
      .replace(/days?/gi, (match) => (match === 'day' ? 'dia' : 'dias'));

    return formattedTime;
  };

  useEffect(() => {
    handleParkingOptions(ParkingOptions.RESERVATIONS);
  }, []);

  const [reserveData, setReserveData] = useState<IReserve | null>(null);

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
                  {!reserveData && <h1>Placa {id?.toUpperCase()}</h1>}
                </div>
                {reserveData ? (
                  <div id="reserve-field">
                    <div>
                      <span>placa</span>
                      <h1>{reserveData.plate}</h1>
                    </div>
                    <div>
                      <span>status</span>
                      <span>{!reserveData.left ? 'Estacionado' : 'Liberado'}</span>
                    </div>
                    <div>
                      <span>{reserveData.paid ? 'Tempo Total' : 'Tempo Atual'}</span>
                      <span>{formatTimeToPortuguese(reserveData.time)}</span>
                    </div>
                    <div>
                      <span>pagamento</span>
                      <span>{reserveData.paid ? 'Pago' : <hr />}</span>
                    </div>
                  </div>
                ) : (
                  <div id="reservations-field">
                    {fetch.data
                      .sort((a: any, b: any) => a.paid - b.paid)
                      .map((item: IReserve) => {
                        return (
                          <button onClick={() => setReserveData(item)} key={item.reservation} className="reserve-card">
                            <div>
                              <div>
                                <span>{item.paid ? 'Tempo Total' : 'Tempo Atual'}</span>
                                <span>{formatTimeToPortuguese(item.time)}</span>
                              </div>
                              <div>
                                <span>pagamento</span>
                                <span>{item.paid ? 'Pago' : <hr />}</span>
                              </div>
                            </div>
                          </button>
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
