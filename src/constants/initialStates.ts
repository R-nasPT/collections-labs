const createChannelState = () => ({
  standard: 0,
  tiktok: 0,
  lazada: 0,
  shopee: 0,
});

const createCourierState = () => ({
  pending: createChannelState(),
  printed: createChannelState(),
  picked: createChannelState(),
  packed: createChannelState(),
  dispatched: createChannelState(),
});

export const initialDelivery = {
  kerry: createCourierState(),
  LEX: createCourierState(),
  BEST: createCourierState(),
};

// ====================================
// เป็นฟังก์ชันที่สามารถแปลงรายการคู่ key-value (เช่น อาร์เรย์ของอาร์เรย์) ให้เป็นอ็อบเจกต์. 
const entries = [
  ['name', 'John'],
  ['age', 30],
  ['city', 'New York']
];

const obj = Object.fromEntries(entries);

console.log(obj);
// Output: { name: 'John', age: 30, city: 'New York' }
// ====================================

const couriers = ['kerry', 'LEX', 'BEST'];
const statuses = ['pending', 'printed', 'picked', 'packed', 'dispatched'];

export const initialDelivery = Object.fromEntries(
  couriers.map(courier => [courier, createCourierState()]) <--มันจะเอา array ตัวแรกเป็น key และตัวที่ 2 เป็น value
  // return เป็น array  // [kerry,  { pending:{ standard: 0, tiktok: 0, ... } } ] <-- ผลลัพธ์
                      //  LEX
                      //  BEST
);

function createCourierState() {
  return Object.fromEntries(
    statuses.map(status => [status, createChannelState()])
                        // [ pending  { standard: 0, tiktok: 0, ... } ] <-- ผลลัพธ์
  );
}

function createChannelState() {
  return {
    standard: 0,
    tiktok: 0,
    lazada: 0,
    shopee: 0,
  };
}
// -------------------------------------------

const deliveryTypes = ['kerry', 'LEX', 'BEST'];
const deliveryStatuses = ['pending', 'printed', 'picked', 'packed', 'dispatched'];
const platforms = ['standard', 'tiktok', 'lazada', 'shopee'];

const createInitialDeliveryStatus = () => Object.fromEntries(
  deliveryStatuses.map(status => [
    status, 
    Object.fromEntries(platforms.map(platform => [platform, 0]))
  ])
);

export const initialDelivery = Object.fromEntries(
  deliveryTypes.map(type => [type, createInitialDeliveryStatus()])
);
