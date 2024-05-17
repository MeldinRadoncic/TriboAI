import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const tribodb = new Pool({
    user: isProduction ? process.env.TRIBO_PRODUCTION_USER : process.env.TRIBODB_DEV_USER,
    host: isProduction ? process.env.TRIBODB_PRODUCTION_HOST : process.env.TRIBODB_DEV_HOST,
    database: isProduction ? process.env.TRIBODB_PRODUCTION_URL : process.env.TRIBODB_DEV_URL,
    password: isProduction ? process.env.TRIBODB_PRODUCTION_PASSWORD : process.env.TRIBODB_DEV_PASSWORD,
    port: isProduction ? process.env.TRIBODB_PRODUCTION_PORT : process.env.TRIBODB_DEV_PORT,
});

export default tribodb;





