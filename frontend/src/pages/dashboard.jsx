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
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const persistWidgets = (updater) => {
    setWidgets((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveStoredWidgets(next);
      return next;
    });
  };

  const formatWidgetFromResponse = (response, payload) => {
    return {
      id: response.widgetId || crypto.randomUUID(),
      script: response.script || "",
      color: payload.color,
      width: payload.width,
      height: payload.height,
      createdAt: new Date().toLocaleString(),
    };
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <main className="relative min-h-screen bg-slate-50 p-4 md:p-8 overflow-hidden">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-20 top-8 h-60 w-60 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />

      <ToastNotification />

      {/* MOBILE TOP BAR */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-2xl text-slate-700"
        >
          ☰
        </button>

        <h1 className="text-lg font-bold text-slate-700">Dashboard</h1>
      </div>

      {/* GRID */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar onLogout={handleLogout} />
        </div>

        {/* MAIN CONTENT */}
        <div>

          <Navbar title="Dashboard" tag="Live Configuration" />

          <Card className="p-4 md:p-8">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
              SaaS Dashboard
            </p>

            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900">
              Create Widget
            </h2>

            <p className="mt-3 text-sm md:text-lg text-slate-600">
              Generate embeddable widgets and copy script instantly.
            </p>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">

              <Button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-6 py-3"
              >
                Create Widget
              </Button>

              <span className="rounded-full border bg-indigo-50 px-3 py-1 text-xs text-indigo-700">
                Fast setup
              </span>

              <span className="rounded-full border bg-violet-50 px-3 py-1 text-xs text-violet-700">
                Copy-ready script
              </span>

            </div>

            {/* LOADING */}
            {loading && (
              <p className="mt-4 text-sm text-indigo-600">
                Creating widget...
              </p>
            )}

            {/* SUCCESS */}
            {createdWidget && (
              <div className="mt-6">
                <WidgetSuccessCard script={createdWidget.script} />
              </div>
            )}

          </Card>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">

          <div className="absolute left-0 top-0 h-full w-64 bg-white p-5 shadow-xl">

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mb-6 text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">

              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="text-left"
              >
                📊 Dashboard
              </button>

              <button
                onClick={() => {
                  navigate("/my-widgets");
                  setMobileMenuOpen(false);
                }}
                className="text-left"
              >
                🧩 My Widgets
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-red-500"
              >
                🚪 Logout
              </button>

            </div>

          </div>
        </div>
      )}

      {/* MODAL */}
      <CreateWidgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(response, payload) => {
          setLoading(true);

          const widget = formatWidgetFromResponse(response, payload);

          setCreatedWidget(response);

          persistWidgets((prev) => [widget, ...prev]);

          setShowModal(false);
          setLoading(false);
        }}
      />
    </main>
  );
}

export default Dashboard;