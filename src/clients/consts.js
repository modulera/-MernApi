import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV?.trim() || 'dev'}` });

const NODE_ENV = process.env.NODE_ENV;

const APP_CONF = {
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || 'localhost',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

const DB_CONF = {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    MYSQL_DB: process.env.MYSQL_DB,
};

const REDIS_PRICE_CONF = {
    PORT: process.env.PRICE_REDIS_PORT,
    HOST: process.env.PRICE_REDIS_HOST,
};

const ONESIGNAL_CONF = {
    APP_ID: process.env.ONESIGNAL_APP_ID,
    REST_API_KEY: process.env.ONESIGNAL_REST_API_KEY,
    REST_API_BASE_URL: process.env.ONESIGNAL_REST_API_BASE_URL,
};

const MESSAGES = {
    MISSING_PARAMS: 'MISSING_PARAMS',
    MISSING_DATA: 'MISSING_DATA',
};

module.exports = {
    NODE_ENV,
    APP_CONF,
    DB_CONF,
    REDIS_PRICE_CONF,
    ONESIGNAL_CONF,
    MESSAGES,
}