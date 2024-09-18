import { IReservation } from "../../@types/Reservation";
import { formatTimeToPortuguese } from "../../utils/formatTimeToPortuguese";

interface IProps {
  item: IReservation;
}

const ReservationField = ({ item }: IProps) => {
  return (
    <div id="reservation-field">
    <div>
      <span>placa</span>
      <h1>{item.plate}</h1>
    </div>
    <div>
      <span>status</span>
      <span>{!item.left ? 'Estacionado' : 'Liberado'}</span>
    </div>
    <div>
      <span>{item.paid ? 'Tempo Total' : 'Tempo Atual'}</span>
      <span>{formatTimeToPortuguese(item.time)}</span>
    </div>
    <div>
      <span>pagamento</span>
      <span>{item.paid ? 'Pago' : <hr />}</span>
    </div>
  </div>
  )
}

export default ReservationField;