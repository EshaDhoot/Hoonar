import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const SECRET_KEY = process.env.SECRET_KEY ;
export const USER_EMAIL = process.env.USER_EMAIL;
export const PASSWORD = process.env.PASSWORD;