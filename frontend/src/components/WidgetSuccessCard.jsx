import toast from "react-hot-toast";
import Button from "./Button";
import Card from "./Card";

function WidgetSuccessCard({ script }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      toast.success("Copied!");
    } catch {
      toast.error("Unable to copy script");
    }
  };

  return (
    <Card className="mt-8 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white text-left">
      <h3 className="text-lg font-semibold text-emerald-800">Widget Created Successfully</h3>
      <p className="mt-2 text-sm text-emerald-700">
        Embed this script where your widget should appear:
      </p>
      <pre className="mt-4 overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 text-xs text-slate-100">
        <code>{script}</code>
      </pre>
      <Button type="button" onClick={handleCopy} variant="success" className="mt-4">
        Copy Script
      </Button>
    </Card>
  );
}

export default WidgetSuccessCard;
