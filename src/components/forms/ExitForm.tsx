import { FormEvent, useEffect, useRef, useState } from 'react';
import ExclamationIcon from '../../assets/icons/ExclamationIcon';
import Modal from '../Modal';
import { IModalContent } from '../../@types/ModalProps';

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
      // ativar o campo de inválido quando a máscara não for atendida
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
      modalFunction: '',
    },
    paymentContent: {
      content: 'Confima o pagamento da placa abaixo?',
      plate: plate,
      buttonText: 'confirmar',
      modalFunction: 'teste',
    },
    outContent: {
      content: 'Confirma a saída do veiculo da placa abaixo?',
      plate: plate,
      buttonText: 'Liberar Saída',
      modalFunction: 'teste',
    },
  };

  const [activeModalContent, setActiveModalContent] = useState<IModalContent>(modalContent.defaultContent);

  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

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
      <form id="exit-form" onSubmit={handleForm}>
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
          <button
            data-type="pay"
            className={`${isPatternMatched && plate.length !== 0 && 'active-button'}`}
            type="submit"
          >
            PAGAMENTO
          </button>
          <button
            data-type="out"
            className={`${isPatternMatched && plate.length !== 0 && 'active-button'} transparent-background-button`}
            type="submit"
          >
            Saída
          </button>
          <button id="history-button" type="button">
            Ver Histórico
          </button>
        </div>
      </form>
      <Modal
        content={activeModalContent.content}
        plate={activeModalContent.plate}
        buttonText={activeModalContent.buttonText}
        modalRef={modalRef}
        modalFunction={activeModalContent.modalFunction}
      />
    </>
  );
};

export default ExitForm;
