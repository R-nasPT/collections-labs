interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <>
      <button
        className="flex items-center justify-center gap-2 py-2 px-4 font-semibold shadow-md rounded-lg text-white bg-red-600 shadow-red-400/40"
        onClick={onClose}
      >
        Delete
      </button>

      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        }`}
        onClick={onClose}
      >
        {/* modal */}
        <div
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}
