function ConfirmationModal({ message, show, onHide, onConfirm }) {
    const modalStyle = {
      display: show ? "block" : "none",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  
    return (
      <div className="modal" style={modalStyle} onClick={onHide}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="close" onClick={onHide}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                No
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmationModal;
  