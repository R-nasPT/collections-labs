// ตัวอย่างการใช้งานในคอมโพเนนต์หรือไฟล์อื่น ๆ
import appConfig from '../config/appConfig';
import apiConfig from '../config/apiConfig';
import dbConfig from '../config/dbConfig';
import envConfig from '../config/envConfig';
import routesConfig from '../config/routesConfig';

console.log('App Name:', appConfig.appName);
console.log('API Base URL:', apiConfig.baseUrl);
console.log('Database Host:', dbConfig.host);
console.log('Environment:', envConfig.isDevelopment ? 'Development' : 'Production');
console.log('Home Route:', routesConfig.home);
