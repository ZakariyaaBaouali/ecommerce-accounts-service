import express from "express";
import { APP_PORT, initServer } from "./config";

const app = express();

initServer(app);
app.use("/accounts/avatar", express.static("storage"));

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
