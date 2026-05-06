import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import "./toast.css";

const ToastContext = createContext(null);

const TOAST_DURATION = 4200;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    ({ title, message, type = "info", duration = TOAST_DURATION }) => {
      const id = crypto.randomUUID();
      const toast = { id, title, message, type };

      setToasts((currentToasts) => [toast, ...currentToasts].slice(0, 4));

      if (duration > 0) {
        const timer = setTimeout(() => removeToast(id), duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      toast: showToast,
      success: (title, message) => showToast({ title, message, type: "success" }),
      error: (title, message) => showToast({ title, message, type: "error" }),
      info: (title, message) => showToast({ title, message, type: "info" }),
      removeToast,
    }),
    [removeToast, showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toastViewport" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div className={`toast toast-${toast.type}`} key={toast.id}>
            <span className="toastIcon" aria-hidden="true"></span>
            <div className="toastContent">
              <strong>{toast.title}</strong>
              {toast.message && <p>{toast.message}</p>}
            </div>
            <button
              className="toastClose"
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
