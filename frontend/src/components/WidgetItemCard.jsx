import toast from "react-hot-toast";
import Button from "./Button";
import Card from "./Card";

function WidgetItemCard({ widget, onDelete }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(widget.script || "");
      toast.success("Copied!");
    } catch {
      toast.error("Unable to copy script");
    }
  };

  return (
    <Card className="hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Widget ID: {widget.id}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-5 w-5 rounded-md border border-slate-300"
                style={{ backgroundColor: widget.color }}
              />
              {widget.color}
            </span>
            <span>{widget.width} / {widget.height}</span>
            <span>{widget.createdAt}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCopy}>
            Copy Script
          </Button>
          <Button variant="danger" onClick={() => onDelete(widget)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default WidgetItemCard;
