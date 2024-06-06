const envConfig = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',
  apiKey: process.env.API_KEY || 'default_api_key',
};

export default envConfig;
