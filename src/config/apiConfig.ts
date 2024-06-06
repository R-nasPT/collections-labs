const apiConfig = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
  timeout: 5000, // ระยะเวลา timeout สำหรับการเรียก API
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
};

export default apiConfig;
