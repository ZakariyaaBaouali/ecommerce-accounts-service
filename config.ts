import dotenv from "dotenv";
dotenv.config();

export const APP_PORT = process.env.PORT;

export const mysql_uri = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`;
