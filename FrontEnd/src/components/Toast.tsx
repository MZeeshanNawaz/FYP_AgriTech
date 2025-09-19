import React from "react";
import {Toast} from "../types/index"

const Toast: React.FC<Toast> = ({ message, type }) => {
  return (
    <div
      className={`toast align-items-center text-bg-${type} border-0 show position-fixed bottom-0 end-0 m-3`}
      role="alert"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
