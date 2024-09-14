import { useEffect, useState } from 'react';
import ExclamationIcon from '../../assets/icons/ExclamationIcon';

const ExitForm = () => {
  const [plate, setPlate] = useState<string>('');
  const [isPatternMatched, setIsPatternMatched] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');

    if (value.length > 3) {
      setPlate(value.substring(0, 3).toUpperCase() + '-' + value.substring(3, 7));
    } else {
      setPlate(value.toUpperCase());
    }

    const isMatched = !event.target.validity.patternMismatch;

    setIsPatternMatched(isMatched);
  };

  const [isActiveInvalidInput, setIsActiveInvalidInput] = useState<boolean>(false);

  useEffect(() => {
    if (!isPatternMatched && plate.length === 8) {
      setIsActiveInvalidInput(true);
    } else {
      setIsActiveInvalidInput(false);
    }
  }, [plate]);

  return (
    <form id="exit-form">
      <div>
        <div>
          <label htmlFor="car-license-plate">Número da placa:</label>
          <input
            className={`${isActiveInvalidInput && 'invalid-input'}`}
            type="text"
            id="car-license-plate"
            placeholder="AAA-0000"
            pattern="[A-Z]{3}-\d{4}"
            title="Exemplo: AAA-0000"
            maxLength={8}
            value={plate}
            onChange={handleInputChange}
            required
          />
          {isActiveInvalidInput && (
            <div className="error-warning">
              <ExclamationIcon />
              <span>A placa deve ser válida, seguindo o seguinte formato: AAA-0000</span>
            </div>
          )}
        </div>
        <button className={`${isPatternMatched && plate.length !== 0 && 'active-button'}`} type="submit">
          PAGAMENTO
        </button>
        <button className={`${isPatternMatched && plate.length !== 0 && 'active-button'} transparent-background-button`} type="submit">
          Saída
        </button>
        <button id='history-button' type='button'>Ver Histórico</button>
      </div>
    </form>
  );
};

export default ExitForm;
