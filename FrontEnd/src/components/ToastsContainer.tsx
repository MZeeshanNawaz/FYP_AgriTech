import React from "react";
import { ToastsContainerProps } from "../types/index";

const ToastsContainer: React.FC<ToastsContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast align-items-center text-bg-${t.type || "success"} border-0 mb-2 show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              <strong className="me-1">{t.title}</strong>
              <div className="small">{t.message}</div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => removeToast(t.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastsContainer;
