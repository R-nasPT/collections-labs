interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[90]"
          onClick={onClose}
        ></div>
      )}

      {/* ----- Desktop ----- */}
      <aside
        className={`fixed z-[100] transition-all duration-300 ease-in-out hidden lg:block
        w-1/2 h-full
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        bottom-0 right-0 top-0
        bg-white shadow-xl`}
      >
        <div className="p-4">{children}</div>
      </aside>

      {/* ----- Mobile ----- */}
      <aside
        className={`fixed z-[100] transition-all duration-300 ease-in-out lg:hidden overflow-hidden
         w-full h-[90%] rounded-t-2xl
        ${isOpen ? "translate-y-0" : "translate-y-full"}
        bottom-0 left-0
        bg-white shadow-xl`}
      >
        <section>
          <div
            className="flex justify-center p-2 mb-2 bg-gray-50"
            onClick={onClose}
          >
            <div className="py-1 w-14 bg-slate-400 rounded-full"></div>
          </div>
          {children}
        </section>
      </aside>
    </>
  );
}
