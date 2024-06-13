import { Request, Response } from "express";
import { AccountsRepo } from "../db";
import { Utils } from "../utils";
import {
  AddAccountAvatar,
  AddAccountPassword,
  CreateAccountDTO,
  LoginAccountDTO,
} from "../dto";

const accountRepo = new AccountsRepo();
const utils = new Utils();

export class AccountController {
  //✅✅✅
  public async getAccounts(req: Request, res: Response) {
    const data = await accountRepo.getAccounts();
    if (!data)
      return res.status(200).send({ message: "no data available ✅✅✅" });
    return res.status(200).send(data);
  }

  //✅✅✅
  public async createAccount(req: Request, res: Response) {
    let { email, userName, password, id } = <CreateAccountDTO>req.body;
    //check
    const findAccount = await accountRepo.getAccountByEmail(email);
    if (findAccount)
      return res.status(400).send({
        message: `account with email = ${email} already exits please log in ✅✅✅`,
      });

    //hash + create
    password = await utils.hashPassword(password);
    id = utils.generateID();
    const data = await accountRepo.createAccount({
      email,
      userName,
      password,
      id,
    });

    //gen token
    if (!data)
      return res.status(400).send({
        message: `can't create account with email ${email} ✅✅✅`,
      });

    const token = utils.genToken(id);
    return res.status(201).send({ token });
  }

  //✅✅✅
  public async loginAccount(req: Request, res: Response) {
    const { email, password } = <LoginAccountDTO>req.body;
    //check
    const findAccount = await accountRepo.getAccountByEmail(email);
    if (!findAccount)
      return res.status(400).send({
        message: `account with email : ${email} not exits ✅✅✅`,
      });

    //check password
    const checkPassword = await utils.verifyPassword(
      password,
      findAccount.password
    );
    if (!checkPassword)
      return res.status(400).send({
        message: `credintials are incorrect ✅✅✅`,
      });

    //
    const token = utils.genToken(findAccount.id);
    return res.status(201).send({ token });
  }

  //✅✅✅
  public async addAccountAvatar(req: Request, res: Response) {
    const { id, avatar }: AddAccountAvatar = {
      avatar: req.avatar,
      id: req.login_user,
    };

    //check user
    const findAccount = await accountRepo.getAccountById(id);
    if (!findAccount)
      return res
        .status(400)
        .send({ message: `account with id : ${id} not exits ✅✅✅` });

    //add avatar
    const data = await accountRepo.addAccountAvatar({ avatar, id });
    return res.status(201).send(data);
  }

  //✅✅✅
  public async addProviderPassword(req: Request, res: Response) {
    let { id, password }: AddAccountPassword = {
      id: req.login_user,
      password: req.body.password,
    };

    //check user
    const findAccount = await accountRepo.getAccountById(id);
    if (!findAccount)
      return res
        .status(400)
        .send({ message: `account with id : ${id} not exits ✅✅✅` });

    //add password
    password = await utils.hashPassword(password);
    const data = await accountRepo.addProviderPassword({ password, id });
    return res.status(201).send(data);
  }

  //✅✅✅
  public async deleteAccount(req: Request, res: Response) {
    const { email, password } = <LoginAccountDTO>req.body;
    //check
    const findAccount = await accountRepo.getAccountByEmail(email);
    if (!findAccount)
      return res
        .status(400)
        .send({ message: `account with email : ${email} not exits ✅✅✅` });

    //check password
    const checkPassword = await utils.verifyPassword(
      password,
      findAccount.password
    );
    if (!checkPassword)
      return res
        .status(400)
        .send({ message: `account credinials incorrect ✅✅✅` });

    //delete account
    const data = await accountRepo.deleteAccount(email);
    return res
      .status(200)
      .send({ message: "account deleted ✅✅", user: data });
  }
}
