//
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { AccountsRepo } from "../db";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import { Utils } from "../utils";
import { CreateAccountDTO, GoogleAccount } from "../dto";
import { accountRepo, utils } from "..";

// //✅✅✅

//✅✅✅✅
async function addGoogleAccount(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: any
) {
  const accountEmail = profile.emails ? profile.emails[0].value : "";
  const findAccount = await accountRepo.getAccountByEmail(accountEmail);
  //check ✅
  if (!findAccount) {
    const accountUserName = profile.displayName ? profile.displayName : "";
    const newAccount: CreateAccountDTO = {
      email: accountEmail,
      id: utils.generateID(),
      userName: accountUserName,
      password: "",
    };
    const data = await accountRepo.createAccount(newAccount);
    //add avatar from google profile ✅
    if (data) {
      const accountAvatar = profile.photos ? profile.photos[0].value : "";
      await accountRepo.addAccountAvatar({
        id: data.id,
        avatar: accountAvatar,
      });
    }
    return done(null, {
      id: data?.id,
    });
  }
  //
  return done(null, {
    id: findAccount?.id,
  });
}

//google auth ✅✅✅✅
export function initGoogleAuth() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/v1/accounts/google/callback",
      },
      addGoogleAccount
    )
  );
  passport.serializeUser((user, done) => {
    const accountLogged = <GoogleAccount>user;
    done(null, accountLogged.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, {
      id,
    });
  });
}
