import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import FormField from "./FormField";
import Spinner from "./Spinner";
import Button from "./Button";

const initialState = {
  knowledgeBase: "",
  platform: "",
  color: "#4f46e5",
  width: "",
  height: "",
};

/* ---------------- MOCK API ---------------- */
const mockCreateWidget = (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          widgetId: crypto.randomUUID(),
          script: `<script src="https://fake-widget.com/widget.js?id=${Date.now()}"></script>`,
        },
      });
    }, 1000);
  });
};
/* ------------------------------------------ */

function CreateWidgetModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

      setFormData((prev) => ({
        ...prev,
        knowledgeBase: fileText,
      }));

      setErrors((prev) => ({
        ...prev,
        knowledgeBase: "",
      }));

      setUploadedFileName(file.name);
      toast.success("File loaded successfully");
    } catch {
      toast.error("Could not read file");
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetState();
      onClose();
    }
  };

  /* ---------------- SUBMIT (MOCK) ---------------- */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await mockCreateWidget(formData);

      onSuccess(response.data, formData);

      toast.success("Widget created successfully");

      resetState();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  /* ---------------------------------------------- */

  return (
    <Modal
      isOpen={isOpen}
      title="Create Widget"
      onClose={handleClose}
      maxWidthClass="max-w-5xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <p className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
          ⚡ Demo mode active (no backend required)
        </p>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="space-y-4">

            <FormField
              label="Knowledge Base"
              name="knowledgeBase"
              value={formData.knowledgeBase}
              onChange={handleChange}
              error={errors.knowledgeBase}
              as="textarea"
              placeholder="Describe your content..."
            />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">
                Upload File
              </label>

              <input
                type="file"
                accept=".txt,.md,.json,.csv"
                onChange={handleKnowledgeBaseFile}
                className="w-full cursor-pointer rounded-xl border bg-white p-2 text-sm"
              />

              {uploadedFileName && (
                <p className="mt-2 text-xs text-slate-500">
                  Loaded: {uploadedFileName}
                </p>
              )}
            </div>

            <FormField
              label="Platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              error={errors.platform}
              as="select"
              options={["Website", "Shopify", "WordPress"]}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                label="Color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleChange}
              />

              <FormField
                label="Width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="300px"
              />

              <FormField
                label="Height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="400px"
              />
            </div>

          </div>

          {/* RIGHT SIDE PREVIEW */}
          <div className="rounded-2xl border bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Live Preview
            </p>

            <div className="mt-4 flex min-h-[280px] items-end justify-end rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-4">

              <div
                className="rounded-2xl p-4 text-white shadow-lg"
                style={{
                  width: formData.width || "300px",
                  height: formData.height || "180px",
                  backgroundColor: formData.color,
                }}
              >
                <p className="text-xs opacity-80">Widget</p>
                <p className="mt-2 text-sm">
                  {formData.knowledgeBase ||
                    "Live preview will appear here"}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 py-3"
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? "Creating..." : "Create Widget"}
        </Button>

      </form>
    </Modal>
  );
}

export default CreateWidgetModal;