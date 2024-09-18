import React from 'react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ExclamationIcon from '../../assets/icons/ExclamationIcon';
import Modal from '../Modal';
import { IModalContent } from '../../@types/ModalProps';
import { Method } from '../../@types/Methods';
import { useNavigate } from 'react-router-dom';

const ExitForm = () => {
  const navigate = useNavigate();
  
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

  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    if (!isPatternMatched && plate.length === 8) {
      // ativar o campo de inválido quando a máscara não for atendida
      setErrorText('A placa deve ser válida, seguindo o seguinte formato: AAA-0000');
      setIsActiveInvalidInput(true);
    } else {
      setIsActiveInvalidInput(false);
    }
  }, [plate]);  

  const modalContent = {
    defaultContent: {
      content: '',
      plate: '',
      buttonText: '',
      loadingText: '',
      warningOfDoneText: '',
      notFoundText: '',
      dataFetch: {
        url: '',
        method: '' as Method,
      },
    },
    paymentContent: {
      content: 'Confima o pagamento da placa abaixo?',
      plate: plate,
      buttonText: 'confirmar',
      loadingText: 'Confirmando',
      warningOfDoneText: 'pago!',
      notFoundText: 'Reserva não encontrada ou já paga',
      dataFetch: {
        url: `https://parking-lot-to-pfz.herokuapp.com/parking/${plate}/pay`,
        method: 'POST' as Method,
      },
    },
    outContent: {
      content: 'Confirma a saída do veiculo da placa abaixo?',
      plate: plate,
      buttonText: 'Liberar Saída',
      loadingText: 'Confirmando',
      warningOfDoneText: 'SAÍDA LIBERADA!',
      notFoundText: 'Reserva não encontrada ou já saiu',
      dataFetch: {
        url: `https://parking-lot-to-pfz.herokuapp.com/parking/${plate}/out`,
        method: 'POST' as Method,
      },
    },
  };

  const [activeModalContent, setActiveModalContent] = useState<IModalContent>(modalContent.defaultContent);

  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    if (submitter.dataset.type === 'history') return navigate(`/reservations/${plate}`); 

    let content = modalContent.defaultContent;

    if (submitter.dataset.type === 'pay') {
      content = modalContent.paymentContent;
    } else if (submitter.dataset.type === 'out') {
      content = modalContent.outContent;
    }

    setActiveModalContent(content);

    modalRef.current?.showModal();
  };

  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <form role='form' id="exit-form" onSubmit={handleForm}>
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
          <button
            data-type="pay"
            className={`${!isActiveInvalidInput && isPatternMatched && plate.length !== 0 && 'active-button'}`}
            type="submit"
          >
            PAGAMENTO
          </button>
          <button
            data-type="out"
            className={`${
              !isActiveInvalidInput && isPatternMatched && plate.length !== 0 && 'active-button'
            } transparent-background-button`}
            type="submit"
          >
            Saída
          </button>
          <button data-type='history' id="history-button" type="submit">
            Ver Histórico
          </button>
        </div>
      </form>
      <Modal
        content={activeModalContent.content}
        plate={activeModalContent.plate}
        buttonText={activeModalContent.buttonText}
        modalRef={modalRef}
        dataFetch={activeModalContent.dataFetch}
        loadingText={activeModalContent.loadingText}
        warningOfDoneText={activeModalContent.warningOfDoneText}
        notFoundText={activeModalContent.notFoundText}
        setIsActiveInvalidInput={setIsActiveInvalidInput}
        setErrorText={setErrorText}
      />
    </>
  );
};

export default ExitForm;
