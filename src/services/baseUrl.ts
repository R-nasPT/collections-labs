import axios from "axios";

export const baseUrl = axios.create({
  baseURL: process.env.IFP_HOST,
  headers: {
    Authorization: `Bearer ${process.env.IFP_TOKEN}`,
  },
});
