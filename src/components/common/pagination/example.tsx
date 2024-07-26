import Pagination from "@/components/common/pagination";
import OrderTable from "@/components/delivery-orders/OrderTable";
import { getDetailedDeliveryOrders } from "@/services";

interface DeliveryOrdersProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DeliveryOrders({
  searchParams,
}: DeliveryOrdersProps) {
  const orders = await getDetailedDeliveryOrders()
  // console.log({orders2});
  const page = searchParams["page"] ?? "1";
  // const page = searchParams.page ?? "1"; <--- แบบนี้ก็ได้เหมือนกัน
  const per_page = searchParams["per_page"] ?? "10";
  // const per_page = searchParams.per_page ?? "10";

  const start = (Number(page) - 1) * Number(per_page); // 0, 10, 20 ...
  const end = start + Number(per_page); // 10, 20. 30 ...
console.log(start);

  // const orders = [
  //   {
  //     id: "1",
  //     documentCode: "30849",
  //     reference: "PO-202407025",
  //     customerName: "ท***ียา",
  //     trackingNumber: "TH01105WT86K9E",
  //     status: "Pending",
  //     lastUpdate: "Thu 11 Jul 2024 09:37:17",
  //   },
  //   {
  //     id: "2",
  //     documentCode: "30850",
  //     reference: "PO-202407026",
  //     customerName: "ส***ชาติ",
  //     trackingNumber: "TH01105WT86K9F",
  //     status: "Dispatched",
  //     lastUpdate: "Thu 12 Jul 2024 10:37:17",
  //   },
  //   {
  //     id: "3",
  //   },
  //   {
  //     id: "4",
  //   },
  //   {
  //     id: "5",
  //   },
  //   {
  //     id: "6",
  //   },
  //   {
  //     id: "7",
  //   },
  //   {
  //     id: "8",
  //   },
  //   {
  //     id: "9",
  //   },
  //   {
  //     id: "10",
  //   },
  //   {
  //     id: "11",
  //   },
  //   {
  //     id: "12",
  //   },
  // ];

  const entries = orders.slice(start, end);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_0_3px_rgba(0,0,0,0.3)]">
      <section className="flex justify-between items-center gap-5">
        <input
          className="px-5 py-2 rounded-full border border-[#e0e0e0] focus:outline-none bg-[#fafafa] flex-1"
          type="text"
          placeholder="Search"
        />
        <input
          className="hidden lg:block px-5 py-2 rounded-full border border-[#e0e0e0] focus:outline-none bg-[#fafafa] flex-1"
          type="date"
        />
        <h1 className="hidden lg:block">To</h1>
        <input
          className="hidden lg:block px-5 py-2 rounded-full border border-[#e0e0e0] focus:outline-none bg-[#fafafa] flex-1"
          type="date"
        />
        <input
          className="hidden lg:block px-5 py-2 rounded-full border border-[#e0e0e0] focus:outline-none bg-[#fafafa] flex-1"
          type="text"
        />
      </section>

      <section className="hidden lg:flex py-5 gap-3 text-[13px] text-[#280d5f]">
        <span className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          All Status (312)
        </span>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-[#979797] rounded-full"></div>
          <span>Draft (0)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-yellow-400 rounded-full"></div>
          <span>Pending (20)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-blue-400 rounded-full"></div>
          <span>Printed (17)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-purple-400 rounded-full"></div>
          <span>Picked (35)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-pink-400 rounded-full"></div>
          <span>Packed (335)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-green-400 rounded-full"></div>
          <span>Dispatched (565)</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full transition-colors duration-300">
          <div className="p-[6px] bg-red-500 rounded-full"></div>
          <span>Cancelled (46)</span>
        </div>
      </section>

      <OrderTable orders={entries} />
      <Pagination
        total={orders.length}
        hasNextPage={end < orders.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
}
