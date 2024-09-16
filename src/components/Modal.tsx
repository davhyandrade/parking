import { createGlobalStyle } from 'styled-components';
import { IModalProps } from '../@types/ModalProps';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import WarningOfDone from './WarningOfDone';
import useFetch from '../hooks/useFetch';
import { HttpStatusCode } from '../constants/HttpStatusCode';
import { toast } from 'react-toastify';

interface IGlobalStylesProps {
  isOpenModal: boolean | undefined;
}

const GlobalStyles = createGlobalStyle<IGlobalStylesProps>`
  ${(props) =>
    props.isOpenModal &&
    `body {
      overflow: hidden;
    }`}  
`;

const Modal = ({
  modalRef,
  content,
  plate,
  buttonText,
  dataFetch,
  loadingText,
  warningOfDoneText,
  notFoundText,
  setIsActiveInvalidInput,
  setErrorText,
}: IModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [previousStatusDone, setPreviousStatusDone] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false); // desativar o overflow hidden
    modalRef.current?.close();
  };

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    if (modalRef.current?.open) setIsOpenModal(modalRef.current.open);
  }, [modalRef.current?.open]);

  const fetch = useFetch({
    url: dataFetch.url,
    method: dataFetch.method,
    autoRun: false,
  });

  const handleFetch = async () => {
    await fetch.refetch();
  };

  useEffect(() => {
    if (fetch.error) closeModal();

    if (fetch.error?.status === HttpStatusCode.NOT_FOUND) toast.error(notFoundText, { theme: 'colored' });

    if (
      fetch.error?.status === HttpStatusCode.NOT_FOUND ||
      fetch.error?.status === HttpStatusCode.UNPROCESSABLE_ENTITY
    ) {
      // ativar campo de aviso de erro
      setIsActiveInvalidInput(true);
      setErrorText(fetch.error.response.data.errors.plate[0]);
    }
  }, [fetch.error]);

  useEffect(() => {
    setPreviousStatusDone(fetch.statusDone);

    if (fetch.statusDone !== previousStatusDone && previousStatusDone) closeModal();
  }, [fetch.statusDone]);

  return (
    <>
      {isOpenModal && <GlobalStyles isOpenModal={isOpenModal} />}
      <dialog onKeyDown={handleKeyPressDialog} id="modal" ref={modalRef}>
        <div className="position">
          {fetch.loading ? (
            <Loading name={loadingText} />
          ) : fetch.statusDone ? (
            <WarningOfDone name={warningOfDoneText} />
          ) : (
            <>
              <span>{content}</span>
              <span>{plate}</span>
              <button onClick={handleFetch}>{buttonText}</button>
              <button id="back-button" onClick={closeModal}>
                Voltar
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
