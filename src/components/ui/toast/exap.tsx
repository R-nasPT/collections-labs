const {showToast} = useToast()

const handleClick = () => {
  showToast({
    content: ({onClose}) => (
      <div className="bg-blue-500 text-white p-4 mb-2 rounded-md shadow-lg flex items-center justify-between">
        <span>นี่คือข้อความ Toast แบบ custom!</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    ),
    duration: 5000 // ไม่ต้องใส่ถ้าต้องการให้แสดงจนกว่าจะกดปิด
  });
};
