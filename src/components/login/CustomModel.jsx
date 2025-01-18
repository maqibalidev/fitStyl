import React from 'react';
import './modal.css';

const CustomModal = ({ isVisible, onClose, children }) => {
  return (
    isVisible ? (
      <div className="custom-modal-overlay show" onClick={onClose}>
        <div className="custom-modal show" onClick={e => e.stopPropagation()}>
          <div className="custom-modal-header d-flex justify-content-between">
            <h5 className="modal-title">RESET PASSWORD</h5>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          {children}
        </div>
      </div>
    ) : null
  );
};

export default CustomModal;
