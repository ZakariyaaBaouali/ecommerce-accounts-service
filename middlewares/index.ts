import { NextFunction, Request, Response } from "express";
import { Utils } from "../utils";

const utils = new Utils();

export class AccountMiddleware {
  //✅✅✅
  public async getAccount(req: Request, res: Response, next: NextFunction) {
    const signature = req.get("Authorization");
    const token = signature ? signature.split(" ")[1] : "";
    const accountId = utils.getTokenizedUser(token);
    if (!accountId)
      return res
        .status(401)
        .send({ message: `unauthorized user with id : ${accountId} ✅✅✅` });

    req.login_user = accountId;
    next();
  }
}
