import { useCallback, useMemo, useState } from "react";

interface Item {
  id: string;
}

const useCheckbox = (items: Item[]) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      const newSelectedItems: Record<string, boolean> = {};
      items.forEach((item) => {
        newSelectedItems[item.id] = isChecked;
      });
      setSelectedItems(newSelectedItems);
    },
    [items]
  );

  const handleSelectItem = useCallback((id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setSelectedItems((prev) => ({ ...prev, [id]: isChecked }));
    }, []);

  const isAllSelected = useMemo(() => 
    items.length > 0 && items.every((item) => selectedItems[item.id]),
    [items, selectedItems]
  );

  const selectedCount = useMemo(() => 
    Object.values(selectedItems).filter(Boolean).length,
    [selectedItems]
  );

  const selectedIds = useMemo(() => 
    Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([id, _]) => id),
    [selectedItems]
  );

  const resetSelection = useCallback(() => {
    setSelectedItems({});
  }, []);

  return {
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    isAllSelected,
    selectedCount,
    selectedIds,
    resetSelection,
  };
}

export default useCheckbox

// =========================================
import React, { useState } from "react";
import Checkbox from "@/components/common/checkbox";
import { useCheckboxTable } from "@/hooks/useCheckboxTable";

export default function DeliveryOrders() {
  const [orders, setOrders] = useState([
    { id: '1', documentCode: '30849', reference: 'PO-202407025', customerName: 'ท***ียา', trackingNumber: 'TH01105WT86K9E', status: 'Pending', lastUpdate: 'Thu 11 Jul 2024 09:37:17' },
    { id: '2', documentCode: '30850', reference: 'PO-202407026', customerName: 'ส***ชาติ', trackingNumber: 'TH01105WT86K9F', status: 'Dispatched', lastUpdate: 'Thu 12 Jul 2024 10:37:17' },
    // ... อาจมีข้อมูลอีกหลายรายการ
  ]);

  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    isAllSelected,
    selectedCount
  } = useCheckboxTable(orders);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_0_3px_rgba(0,0,0,0.3)]">
       {selectedCount > 0 && (
        <div className="bg-[#eee8fa] py-5 px-3">
          Selected {selectedCount} item(s)
        </div>
      )}
     
      <table className="hidden lg:table w-full text-sm text-[#280d5f] text-left">
        <thead>
          <tr className="border-b border-[#e0e0e0]">
            <th className="p-1">
              <Checkbox
                id="selectAll"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="font-normal p-4">Document Code</th>
            <th className="font-normal p-4">Reference</th>
            <th className="font-normal p-4">Customer Name</th>
            <th className="font-normal p-4">Tracking Number</th>
            <th className="font-normal p-4">Status</th>
            <th className="font-normal p-4">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr
              key={order.id}
              className={`border-b border-[#e0e0e0] ${
                selectedItems[order.id] ? "bg-[#eee8fa]" : ""
              }`}
            >
              <td className="p-1">
                <Checkbox
                  id={`row-${order.id}`}
                  checked={selectedItems[order.id] || false}
                  onChange={handleSelectItem(order.id)}
                />
              </td>
              <td className="p-4">30849</td>
              <td className="p-4">PO-202407025</td>
              <td className="p-4">
                <p>ท***ียา</p>
                <p>2407-0G4-00803</p>
              </td>
              <td className="p-4 whitespace-nowrap">
                <p>TikTok Pickup (เจ้าหน้าที่มารับที่โกดัง)</p>
                <p>TH01105WT86K9E</p>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 border border-[#a07ee4] text-[#7645d9] text-[13px] cursor-pointer hover:bg-gray-100 pl-1 pr-2 py-[.5px] w-fit rounded-full transition-colors duration-300">
                  <div className="p-[6px] bg-[#ffb864] rounded-full"></div>
                  <span>Pending </span>
                </div>
              </td>
              <td className="p-4">Thu 11 Jul 2024 09:37:17</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ... (ส่วนอื่น ๆ ของ JSX) */}
    </div>
  );
}
