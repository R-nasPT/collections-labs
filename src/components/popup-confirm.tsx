import { MouseEventHandler } from "react";
import alert from "../../../public/assets/icons/Alert.svg";

interface PopupComfirmProps {
  featureFn?: MouseEventHandler<HTMLButtonElement>;
  handleClose: () => void;
}

export default function PopupComfirm({ handleClose, featureFn }: PopupComfirmProps) {
  return (
    <section
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <article
        className="flex max-w-xs flex-col items-center gap-5 rounded-3xl bg-white px-6 py-8 text-center lg:max-w-sm lg:gap-7"
        onClick={(e) => e.stopPropagation()} //เพื่อป้องกันการกระจายเหตุการณ์ไปยัง elements ที่สูงกว่าใน DOM tree ซึ่งทำให้เหตุการณ์ไม่ถูกส่งต่อไปยัง elements อื่นๆ
      >
        <img src={alert} alt="alert" width={64} height={64} />
        <p className="text-base font-medium">CANCEL_ORDER ?</p>
        <div>
          <p className="inline">ORDER_CANCELLATION</p>{" "}
          <p
            className="inline cursor-pointer font-medium underline"
            onClick={() =>
              window.open(
                "https://sasom7699.zendesk.com/hc/en-us/articles/4419142198937-Seller-Penalty"
              )
            }
          >
            THE_SELLER_PENALTY_POLICY
          </p>
        </div>
        <div className="flex w-full justify-between gap-2">
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-[#e3e3e3] bg-white py-2 transition-colors duration-300 hover:border-[#5a5a5a]"
            onClick={handleClose}
          >
            <p className="text-xs font-medium text-[#5a5a5a]">CLOSE</p>
          </button>
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-black py-3 transition-colors duration-300 hover:bg-slate-700"
            onClick={featureFn}
          >
            <p className="text-xs font-medium text-white">CANCEL_ORDER</p>
          </button>
        </div>
      </article>
    </section>
  );
}
