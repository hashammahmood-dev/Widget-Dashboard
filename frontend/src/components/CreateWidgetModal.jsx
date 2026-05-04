import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import FormField from "./FormField";
import Spinner from "./Spinner";
import Button from "./Button";
import { createWidget } from "../services/widgetApi";

const initialState = {
  knowledgeBase: "",
  platform: "",
  color: "#4f46e5",
  width: "",
  height: "",
};

function CreateWidgetModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || !String(value).trim()) {
        nextErrors[key] = "This field is required";
      }
    });
    return nextErrors;
  };

  const resetState = () => {
    setFormData(initialState);
    setErrors({});
    setUploadedFileName("");
  };

  const handleKnowledgeBaseFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileText = await file.text();
      setFormData((previous) => ({ ...previous, knowledgeBase: fileText }));
      setErrors((previous) => ({ ...previous, knowledgeBase: "" }));
      setUploadedFileName(file.name);
      toast.success("Knowledge base file loaded");
    } catch {
      toast.error("Could not read selected file");
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetState();
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createWidget(formData);
      onSuccess(response.data, formData);
      toast.success("Widget created successfully");
      resetState();
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const message =
        serverMessage ||
        "Failed to create widget. Ensure backend is running on http://localhost:8000";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Create Widget" onClose={handleClose} maxWidthClass="max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
          Tip: in local development, this works with or without a JWT token.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField
              label="Knowledge Base"
              name="knowledgeBase"
              value={formData.knowledgeBase}
              onChange={handleChange}
              error={errors.knowledgeBase}
              as="textarea"
              placeholder="Describe your knowledge base content..."
            />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <label
                htmlFor="knowledgeBaseFile"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                Browse File
              </label>
              <input
                id="knowledgeBaseFile"
                type="file"
                accept=".txt,.md,.json,.csv"
                onChange={handleKnowledgeBaseFile}
                className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {uploadedFileName ? (
                <p className="mt-2 text-xs text-slate-500">Loaded: {uploadedFileName}</p>
              ) : null}
            </div>

            <FormField
              label="Platform Type"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              error={errors.platform}
              as="select"
              options={["Website", "Shopify", "WordPress"]}
              placeholder="Select platform"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                label="Color Picker"
                name="color"
                value={formData.color}
                onChange={handleChange}
                error={errors.color}
                type="color"
                as="input"
              />
              <FormField
                label="Width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                error={errors.width}
                as="input"
                placeholder="300px"
              />
              <FormField
                label="Height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                error={errors.height}
                as="input"
                placeholder="400px"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live Preview</p>
            <div className="mt-4 flex min-h-[280px] items-end justify-end rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-4">
              <div
                className="max-w-full rounded-2xl border border-white/70 p-4 text-white shadow-lg transition-all duration-300"
                style={{
                  width: formData.width || "300px",
                  height: formData.height || "180px",
                  backgroundColor: formData.color || "#4f46e5",
                }}
              >
                <p className="text-xs uppercase tracking-wider text-white/80">Widget</p>
                <p className="mt-2 max-h-[120px] overflow-hidden text-sm text-white/95">
                  {formData.knowledgeBase || "Your widget preview updates in real-time as you type."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 py-3 text-base"
        >
          {isSubmitting ? <Spinner /> : null}
          {isSubmitting ? "Creating..." : "Create Widget"}
        </Button>
      </form>
    </Modal>
  );
}

export default CreateWidgetModal;
