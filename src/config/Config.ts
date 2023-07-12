export const dbConfig = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  db_port: Number(process.env.DB_PORT || 5432),
  username: process.env.USER_NAME || 'postgres',
  password: process.env.PASSWORD || 'sameer',
  database: process.env.DATABASE || 'Augmented',
  tokenKey: process.env.TOKEN_KEY || 'token_key'
};
