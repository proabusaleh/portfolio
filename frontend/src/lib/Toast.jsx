import { createContext, useCallback, useContext, useState, useRef } from 'react';

const ToastContext = createContext(null);

const ICONS = {
  success: 'bx bx-check-circle',
  error: 'bx bx-error-circle',
  info: 'bx bx-info-circle',
  warning: 'bx bx-bell',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((type = 'success', message = '', duration = 3500) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type} show`}>
            <i className={`toast-icon ${ICONS[t.type] || ICONS.info}`} />
            <span>{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Dismiss"
            >
              <i className="bx bx-x" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
