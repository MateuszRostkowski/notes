import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export type ModalProps = {
  children: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({ children }) => {
  useEffect(() => {
    modalRoot.classList.add('shown');

    return () => {
      modalRoot.classList.remove('shown');
    };
  }, []);

  return ReactDOM.createPortal(children, modalRoot);
};
