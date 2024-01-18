import React, { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="cursor-pointer" onClick={handleClose}>
          <CgClose size={24} />
        </span>
        {children}
      </div>
    </div>
  );
};
