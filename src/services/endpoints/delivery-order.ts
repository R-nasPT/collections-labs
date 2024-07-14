import axios from "axios";

export const getDeliveryOrders = async () => {
  const response = await axios.get("/api/deliveryorder");
  return response.data;
};

