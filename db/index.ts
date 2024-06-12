import db from "mysql2";
import { mysql_uri } from "../config";
import {
  AccountDTO,
  AddAccountAvatar,
  AddAccountPassword,
  CreateAccountDTO,
  LoginAccountDTO,
} from "../dto";

export class AccountsRepo {
  private readonly pool;

  //✅✅✅
  constructor() {
    this.pool = db
      .createConnection({
        uri: mysql_uri,
      })
      .promise();
    this.checkConnection();
  }

  //✅✅✅
  private async checkConnection() {
    const [data] = await this.pool.query("select 1 + 1");
    if (data) console.log("Connect to MySQL");
  }

  //✅✅✅
  public async getAccounts(): Promise<[AccountDTO]> {
    const [data] = await this.pool.query("select * from accounts");
    return data as [AccountDTO];
  }

  //✅✅✅
  public async getAccountByEmail(email: string): Promise<AccountDTO | null> {
    const [data] = await this.pool.query(
      "select * from accounts where email = ?",
      [email]
    );
    const res = data as [AccountDTO];
    return res[0] ? res[0] : null;
  }

  //✅✅✅
  public async getAccountById(id: string): Promise<AccountDTO | null> {
    const [data] = await this.pool.query(
      "select * from accounts where id = ?",
      [id]
    );
    const res = data as [AccountDTO];
    return res[0] ? res[0] : null;
  }

  //✅✅✅
  public async loginAccount(
    payload: LoginAccountDTO
  ): Promise<AccountDTO | null> {
    const { email, password } = payload;
    const findAccount = await this.getAccountByEmail(email);
    if (!findAccount) return null;
    //check pass will be in controller
    return findAccount;
  }

  //✅✅✅
  public async createAccount(
    payload: CreateAccountDTO
  ): Promise<AccountDTO | null> {
    const { id, userName, email, password } = payload;
    const findAccount = await this.getAccountByEmail(email);
    if (findAccount) return null;

    //create new account
    await this.pool.query(
      "insert into accounts (id, userName, email, password) values (? , ? , ? , ?)",
      [id, userName, email, password]
    );
    const data = await this.getAccountById(id);
    return data;
  }

  //✅✅✅
  public async addAccountAvatar(
    payload: AddAccountAvatar
  ): Promise<AccountDTO | null> {
    const { id, avatar } = payload;
    const findAccount = await this.getAccountById(id);
    if (!findAccount) return null;

    //
    await this.pool.query("update accounts set avatar = ? where id = ?", [
      avatar,
      id,
    ]);
    const data = await this.getAccountById(id);
    return data;
  }

  //✅✅✅
  public async deleteAccount(email: string): Promise<AccountDTO | null> {
    const findAccount = await this.getAccountByEmail(email);
    if (!findAccount) return null;

    //
    await this.pool.query("delete from accounts where email = ?", [email]);
    return findAccount;
  }

  //✅✅✅
  public async addProviderPassword(
    payload: AddAccountPassword
  ): Promise<AccountDTO | null> {
    const { id, password } = payload;
    const findAccount = await this.getAccountById(id);
    if (!findAccount) return null;

    //
    await this.pool.query("update accounts set password = ? where id = ?", [
      password,
      id,
    ]);
    const data = await this.getAccountById(id);
    return data;
  }
}
