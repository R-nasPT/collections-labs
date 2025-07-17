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
      <PrintStyle orientation="portrait" size="6in 4in" margin="5mm" />
      <div>
        {/* content */}
      </div>
    </>
  )
