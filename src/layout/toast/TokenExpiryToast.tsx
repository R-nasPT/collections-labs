export default function TokenExpiryToast({ onClose, minutes }: { onClose: () => void; minutes: number; }) {
  return (
    <div className="flex items-start rounded-lg border border-red-200 bg-red-50 p-4 shadow-md">
      <div className="flex-1">
        <h3 className="font-medium text-red-800">แจ้งเตือนความปลอดภัย</h3>
        <p className="mt-1 text-sm text-red-600">
          เซสชันใกล้หมดอายุ เหลือเวลาอีก {minutes} นาที
        </p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 cursor-pointer text-red-400 hover:text-red-600"
      >
        ✕
      </button>
    </div>
  );
}
