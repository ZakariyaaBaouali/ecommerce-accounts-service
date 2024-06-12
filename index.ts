import express, { Request, Response } from "express";
import cors from "cors";
import ejs from "ejs";
import { APP_PORT } from "./config";

const app = express();
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(APP_PORT, () =>
  console.log(`Server start at port ${APP_PORT} ✅✅✅`)
);
