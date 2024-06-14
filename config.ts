import dotenv from "dotenv";
import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import multer from "multer";
import { v4 as genID } from "uuid";
import session from "express-session";
import passport from "passport";
import { initGoogleAuth } from "./passport/google.oauth";
dotenv.config();

//conts ✅✅✅
export const APP_PORT = process.env.PORT;
export const mysql_uri = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`;
export const jwt_secret = process.env.JWT_SECRET || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

//init setup ✅✅✅
export const initServer = (app: Application) => {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  app.use(
    session({
      secret: jwt_secret,
      saveUninitialized: true,
      resave: false,
      cookie: { secure: false, maxAge: 60 * 1000 }, //1m
      name: "__secret_google_auth",
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  initGoogleAuth();

  app.get("/", (req: Request, res: Response) => {
    res.render("index");
  });
};

//setup multer ✅✅✅
export function avatarUploader() {
  const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "storage");
    },
    filename(req, file, callback) {
      const avatar =
        file.originalname + genID() + "." + file.mimetype.split("/")[1];
      req.avatar = avatar;
      callback(null, avatar);
    },
  });

  const uploader = multer({ storage });
  return uploader;
}
