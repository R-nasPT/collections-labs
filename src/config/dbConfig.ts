const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mydatabase',
  user: process.env.DB_USER || 'dbuser',
  password: process.env.DB_PASSWORD || 'password',
};

export default dbConfig;
