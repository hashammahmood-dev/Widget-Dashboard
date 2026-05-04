import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateWidgetModal from "../components/CreateWidgetModal";
import WidgetSuccessCard from "../components/WidgetSuccessCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import ToastNotification from "../components/ToastNotification";
import { getStoredWidgets, saveStoredWidgets } from "../utils/widgetsStorage";

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [createdWidget, setCreatedWidget] = useState(null);
  const [widgets, setWidgets] = useState(getStoredWidgets);

  const persistWidgets = (nextWidgets) => {
    setWidgets(nextWidgets);
    saveStoredWidgets(nextWidgets);
  };

  const formatWidgetFromResponse = (response, requestPayload) => {
    const createdAt = new Date().toLocaleString();
    return {
      id: response.widgetId || response.id || crypto.randomUUID(),
      script: response.script || "",
      color: requestPayload.color,
      width: requestPayload.width,
      height: requestPayload.height,
      createdAt,
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 p-4 md:p-8">
      <div className="pointer-events-none absolute -left-20 top-8 h-60 w-60 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
      <ToastNotification />
      <div className="relative mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
        <Sidebar onLogout={handleLogout} />
        <div>
          <Navbar title="Dashboard" tag="Live Configuration" />
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
              SaaS Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Create Widget</h2>
            <p className="mt-3 max-w-2xl text-slate-600 md:text-lg">
              Generate an embeddable widget for your platform, then copy and paste the script into
              your product.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={() => setShowModal(true)} className="px-6 py-3 text-base">
                Create Widget
              </Button>
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                Fast setup
              </span>
              <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                Copy-ready script
              </span>
            </div>

            {createdWidget ? <WidgetSuccessCard script={createdWidget.script} /> : null}
          </Card>
        </div>
      </div>

      <CreateWidgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(response, payload) => {
          setCreatedWidget(response);
          const nextWidget = formatWidgetFromResponse(response, payload);
          persistWidgets([nextWidget, ...widgets]);
          setShowModal(false);
        }}
      />
    </main>
  );
}

export default Dashboard;
