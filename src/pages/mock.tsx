import useToggle from "../hooks/useToggle";
import PopupComfirm from "../components/popup-confirm";

export default function Mock() {
  const [toggle, setToggle] = useToggle(false);
  return (
    <>
      <div className="grid grid-cols-2 max-w-screen- w-full mx-auto"> {/* max-w-screen-sm w-full mx-auto <--นี่คือ container ที่คล้ายกับ MUI */}
        <button>click toggle</button>
      </div>
      {toggle && <PopupComfirm handleClose={() => setToggle()} />}
    </>
  );
}
