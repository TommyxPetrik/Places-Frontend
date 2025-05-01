import React from "react";

const ModalBackdropFade = ({ onClose }) => {
  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default ModalBackdropFade;
