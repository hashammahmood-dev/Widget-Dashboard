import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import WidgetItemCard from "../components/WidgetItemCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ToastNotification from "../components/ToastNotification";
import { getStoredWidgets, saveStoredWidgets } from "../utils/widgetsStorage";

function MyWidgets() {
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState(getStoredWidgets);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasWidgets = useMemo(() => widgets.length > 0, [widgets]);

  const persistWidgets = (nextWidgets) => {
    setWidgets(nextWidgets);
    saveStoredWidgets(nextWidgets);
  };

  const handleDeleteWidget = () => {
    if (!selectedWidget) return;
    setIsDeleting(true);
    const nextWidgets = widgets.filter((widget) => widget.id !== selectedWidget.id);
    persistWidgets(nextWidgets);
    setSelectedWidget(null);
    setIsDeleting(false);
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
          <Navbar title="My Widgets" tag="Widget Library" />
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">My Widgets</h3>
            {hasWidgets ? (
              <div className="space-y-3">
                {widgets.map((widget) => (
                  <WidgetItemCard
                    key={widget.id}
                    widget={widget}
                    onDelete={(item) => setSelectedWidget(item)}
                  />
                ))}
              </div>
            ) : (
              <Card className="flex flex-col items-center justify-center py-14 text-center">
                <p className="text-lg font-semibold text-slate-800">No widgets created yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Create your first widget from the dashboard to start embedding it in your
                  product.
                </p>
                <Button onClick={() => navigate("/dashboard")} className="mt-5 px-6 py-3">
                  Go To Dashboard
                </Button>
              </Card>
            )}
          </section>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={Boolean(selectedWidget)}
        onClose={() => setSelectedWidget(null)}
        onConfirm={handleDeleteWidget}
        isDeleting={isDeleting}
      />
    </main>
  );
}

export default MyWidgets;
