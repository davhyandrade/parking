import { RefObject } from "react";

export interface IModalProps extends IModalContent{
  modalRef: RefObject<HTMLDialogElement>;
}

export interface IModalContent {
  content: string;
  plate: string;
  buttonText: string;
  modalFunction: any;
}