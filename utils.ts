import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwt_secret } from "./config";
import { JwtPayload } from "./dto";
import { v4 as genID } from "uuid";

export class Utils {
  //✅✅✅
  constructor() {}

  //✅✅✅
  public genToken(id: string): string {
    const jwtPayload: JwtPayload = {
      id,
    };

    const token = jwt.sign(jwtPayload, jwt_secret, {
      expiresIn: "1d",
    });
    return token;
  }

  //✅✅✅
  public getTokenizedUser(token: string): string | null {
    try {
      const { id } = jwt.verify(token, jwt_secret) as JwtPayload;
      if (!id) return null;
      return id;
    } catch (error) {
      return null;
    }
  }

  //✅✅✅
  public generateID(): string {
    return genID();
  }

  //✅✅✅
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  //✅✅✅
  public async verifyPassword(
    entPassword: string,
    strPassword: string
  ): Promise<boolean> {
    const res = await bcrypt.compare(entPassword, strPassword);
    return res;
  }
}
