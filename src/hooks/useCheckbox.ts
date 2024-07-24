import { useCallback, useMemo, useState } from "react";

interface Item {
  id: string;
}

function useCheckbox(items: Item[]) {
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

  return {
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    isAllSelected,
    selectedCount,
  };
}

export default useCheckbox;

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
        <div className="mb-4">
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
            {/* ... (ส่วนหัวตารางอื่น ๆ) */}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-[#e0e0e0]">
              <td className="p-1">
                <Checkbox 
                  id={`row-${order.id}`}
                  checked={selectedItems[order.id] || false}
                  onChange={handleSelectItem(order.id)}
                />
              </td>
              {/* ... (ข้อมูลแถวอื่น ๆ) */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ... (ส่วนอื่น ๆ ของ JSX) */}
    </div>
  );
}
