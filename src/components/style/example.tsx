import { PrintStyle } from '@/components/printStyles';

export default function KEXLabel({ order, fulfillments }: ShippingData) {
  return (
    <>
      <PrintStyle orientation='landscape' />
      <div>
        {/* content */}
      </div>
    </>
  );
}

export default function SPXLabel({ order, fulfillments }: ShippingData) {
  return (
    <>
      <PrintStyle orientation="portrait" />
      <div>
        {/* content */}
      </div>
    </>
  )
