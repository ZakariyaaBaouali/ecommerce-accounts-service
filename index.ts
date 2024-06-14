import express from "express";
import { APP_PORT, initServer } from "./config";
import { AccountsRepo } from "./db";
import { Utils } from "./utils";
import { AccountsRouter } from "./routes";

//init ✅✅✅
const app = express();
initServer(app);
app.use("/accounts/avatar", express.static("storage"));

//routes ✅✅
app.use("/api/v1/accounts", AccountsRouter);

// global classes ✅✅
const accountRepo = new AccountsRepo();
const utils = new Utils();
export { accountRepo, utils };

app.listen(APP_PORT, () =>
  console.log(`Server start at port ${APP_PORT} ✅✅✅`)
);

//globals vars
declare global {
  namespace Express {
    interface Request {
      avatar: string;
      login_user: string;
    }
  }
}
