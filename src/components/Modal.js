import React from "react";
import './Modal.css';
import Button from '@mui/material/Button';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <Button href="javascript:;" className="modal-close" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Modal;
