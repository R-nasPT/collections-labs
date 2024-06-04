import { Product } from "../types/Product";
import { User } from "../types/User";

const { BASE_URL } = process.env;

export const fetchUserData = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const data = await response.json();
  return data;
};

export const fetchProductData = async (): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
};

// หรือสามารถแยกเป็นไฟล์ย่อยเพื่อจัดการ API ที่แตกต่างกัน
// src/services/userApi.js
export const fetchUserData = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const data = await response.json();
  return data;
};

// src/services/productApi.js
export const fetchProductData = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
};
