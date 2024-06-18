import { Dispatch, ReactNode, SetStateAction } from "react";

type Side = "right" | "left" | "top" | "bottom";

type Size = "50%" | "20%" | "80%" | "100%";

interface DrawerProps {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  side?: Side;
  size?: Size;
}

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const sizeClassNames = {
  "20%": {
    horizontal: "w-1/5",
    vertical: "h-1/5",
  },
  "50%": {
    horizontal: "w-1/2",
    vertical: "h-1/2",
  },
  "80%": {
    horizontal: "w-4/5",
    vertical: "h-4/5",
  },
  "100%": {
    horizontal: "w-full",
    vertical: "h-full",
  },
};

export default function Drawer({
  children,
  open,
  setOpen,
  size = "50%",
  side = "right",
}: DrawerProps) {

  const isHorizontal = side === "right" || side === "left";
  const sizeClassName = isHorizontal
    ? sizeClassNames[size].horizontal
    : sizeClassNames[size].vertical;

  return (
    <aside
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-all ${
          open
            ? "opacity-100 duration-500 ease-in-out visible"
            : "opacity-0 duration-500 ease-in-out invisible"
        }`}
      ></div>
      <div className={`${open ? "fixed inset-0 overflow-hidden" : ""}`}>
        <div className="absolute inset-0 overflow-hidden">
          <section
            className={`pointer-events-none fixed max-w-full" ${sizeClassName} ${classNames[side]}`}
          >
            <div
              className={`pointer-events-auto relative w-full bg-red-500 h-full transform transition ease-in-out duration-500 ${
                open ? openClassNames[side] : closeClassNames[side]
              }`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              {/* จริงๆแล้ว overflow-y-scroll ควรไว้ข้างนอก component นี้ */}
              <div className=" h-full overflow-y-scroll hide-scrollbar bg-white shadow-xl"> 
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
