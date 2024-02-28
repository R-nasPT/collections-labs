import useToggle from "../hooks/useToggle";
import PopupComfirm from "../components/popup-confirm";

export default function Mock() {
  const [toggle, setToggle] = useToggle(false);

  const brandPath =
    typeof routeState.brand === "undefined"
      ? "all"
      : decodeURIComponent((routeState?.brand as string)[0]) || // <-- ปกติมันคือ routeState?.brand[0] แต่มันมองไม่เป็น string มันเห็นเป็น Array เลยต้องวงเล็บก่อน แล้วค่อยตามด้วย index
        pathnameMatches?.[1].split("/")[1];

  return (
    <>
      <div className="grid grid-cols-2 max-w-screen- w-full mx-auto">
        {" "}
        {/* max-w-screen-sm w-full mx-auto <--นี่คือ container ที่คล้ายกับ MUI */}
        <button onClick={() => setToggle()}>click toggle</button>
      </div>
      {toggle && <PopupComfirm handleClose={() => setToggle()} />}
    </>
  );
}
