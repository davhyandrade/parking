import { Dispatch, SetStateAction } from 'react';
import { formatTimeToPortuguese } from '../../utils/formatTimeToPortuguese';
import { IReservation } from '../../@types/Reservation';

interface IProps {
  setReservationData: Dispatch<SetStateAction<IReservation | null>>;
  item: IReservation;
}

const ReservationCard = ({ item, setReservationData }: IProps) => {
  return (
    <button onClick={() => setReservationData(item)} className="reservation-card">
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
};

export default ReservationCard;
