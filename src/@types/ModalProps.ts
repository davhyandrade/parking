import { Dispatch, RefObject, SetStateAction } from "react";
import { Method } from "./Methods";

export interface IModalProps extends IModalContent{
  modalRef: RefObject<HTMLDialogElement>;
  setIsActiveInvalidInput: Dispatch<SetStateAction<boolean>>;
  setErrorText: Dispatch<SetStateAction<string | undefined>>;
}

export interface IModalContent {
  content: string;
  plate: string;
  buttonText: string;
  loadingText: string;
  warningOfDoneText: string;
  notFoundText: string;
  dataFetch: IDataFetch;
}

interface IDataFetch {
  url: string;
  method: Method;
}