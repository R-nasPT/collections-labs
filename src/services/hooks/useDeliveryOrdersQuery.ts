import { useQuery } from "@tanstack/react-query";
import { getDeliveryOrders } from "../endpoints/delivery-order";
import { DeliveryOrderTypes } from "@/types/deliveryOrder";

export const useDeliveryOrdersQuery = () => {
  return useQuery<DeliveryOrderTypes[]>({
    queryKey: ["deliveryOrders"],
    queryFn: getDeliveryOrders,
  });
};
