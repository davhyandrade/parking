import { FormEvent, useEffect, useState } from 'react';
import ExclamationIcon from '../../assets/icons/ExclamationIcon';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import WarningOfDone from '../WarningOfDone';
import { HttpStatusCode } from '../../constants/HttpStatusCode';

const EntryForm = () => {
  const [plate, setPlate] = useState<string>('');
  const [isPatternMatched, setIsPatternMatched] = useState(false);
  const [errorText, setErrorText] = useState<string>();

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
      // ativar o campo de inválido quando a máscara não for atendida
      setErrorText('A placa deve ser válida, seguindo o seguinte formato: AAA-0000');
      setIsActiveInvalidInput(true);
    } else {
      setIsActiveInvalidInput(false);
    }
  }, [plate]);

  const parkingRequest = useFetch({
    method: 'POST',
    url: 'https://parking-lot-to-pfz.herokuapp.com/parking',
    headers: { 'Content-Type': 'application/json' },
    autoRun: false,
    body: {
      plate: plate,
    },
  });

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    if (isActiveInvalidInput) return;

    await parkingRequest.refetch();
  };

  useEffect(() => {
    if (parkingRequest.statusCode == HttpStatusCode.OK) setPlate(''); // limpar valor do input
  }, [parkingRequest.statusCode]);

  useEffect(() => {
    if (parkingRequest.error?.status === HttpStatusCode.UNPROCESSABLE_ENTITY) { // ativar aviso de erro
      setIsActiveInvalidInput(true); 
      setErrorText(parkingRequest.error.response.data.errors.plate[0]);
    }
  }, [parkingRequest.error]);

  return (
    <form id="entry-form" onSubmit={handleForm}>
      {parkingRequest.loading ? (
        <Loading name="Registrando" />
      ) : parkingRequest.statusDone ? (
        <WarningOfDone name="registrado!" />
      ) : (
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
                <span>{errorText}</span>
              </div>
            )}
          </div>
          <button className={`${!isActiveInvalidInput && isPatternMatched && plate.length !== 0 && 'active-button'} ${isActiveInvalidInput && 'button-locked'}`} type="submit">
            CONFIRMAR ENTRADA
          </button>
        </div>
      )}
    </form>
  );
};

export default EntryForm;
