import { createGlobalStyle } from 'styled-components';
import { IModalProps } from '../@types/ModalProps';
import { useEffect, useState } from 'react';

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

const Modal = ({ modalRef, content, plate, buttonText }: IModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      setIsOpenModal(false); // desativar o overflow hidden
      modalRef.current?.close();
    }
  }

  useEffect(() => {
    if (modalRef.current?.open) setIsOpenModal(modalRef.current.open);
  }, [modalRef.current?.open]);

  return (
    <>
      {isOpenModal && <GlobalStyles isOpenModal={isOpenModal} />}
      <dialog onKeyDown={handleKeyPressDialog} id="modal" ref={modalRef}>
        <div className="position">
          <span>{content}</span>
          <span>{plate}</span>
          <button>{buttonText}</button>
          <button id="back-button" onClick={() => [setIsOpenModal(false), modalRef.current?.close()]}>
            Voltar
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
