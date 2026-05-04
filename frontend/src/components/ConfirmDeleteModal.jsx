import Button from "./Button";
import Modal from "./Modal";
import Spinner from "./Spinner";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, isDeleting }) {
  return (
    <Modal isOpen={isOpen} title="Delete Widget" onClose={onClose} maxWidthClass="max-w-md">
      <p className="text-sm text-slate-600">
        Are you sure you want to remove this widget from your dashboard list? This action cannot
        be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting} className="inline-flex items-center gap-2">
          {isDeleting ? <Spinner /> : null}
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
