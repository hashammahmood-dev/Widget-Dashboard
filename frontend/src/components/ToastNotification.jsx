import { Toaster } from "react-hot-toast";

function ToastNotification() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#0f172a",
          color: "#f8fafc",
        },
      }}
    />
  );
}

export default ToastNotification;
