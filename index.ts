import express, { Request, Response } from "express";
import cors from "cors";
import { APP_PORT } from "./config";
import { AccountsRepo } from "./db";
import { AccountDTO, LoginAccountDTO } from "./dto";
const repo = new AccountsRepo();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/accounts", async (req: Request, res: Response) => {
  return res.status(200).send("data");
});

app.listen(APP_PORT, () =>
  console.log(`Server start at port ${APP_PORT} ✅✅✅`)
);
