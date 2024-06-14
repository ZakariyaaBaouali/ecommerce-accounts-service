import { Router } from "express";
import { AccountController } from "../controller";
import passport from "passport";
import { AccountMiddleware } from "../middlewares";
import { avatarUploader } from "../config";

//✅✅✅
const router = Router();
const controller = new AccountController();
const middleware = new AccountMiddleware();
const uploader = avatarUploader();

//account ✅✅
router.get("/", controller.getAccounts);

router.post("/create", controller.createAccount);

router.post("/login", controller.loginAccount);

router.delete("/delete", controller.deleteAccount);

//avatar ✅✅
router.patch(
  "/avatar",
  middleware.getAccount,
  uploader.single("avatar"),
  controller.addAccountAvatar
);

//password ✅✅
router.patch(
  "/provider/password",
  middleware.getAccount,
  controller.addProviderPassword
);

//google ✅✅✅
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/accounts/google/failed",
  }),
  controller.getGoogleAccount
);

router.get("/google/failed", controller.failedGoogleLogin);

export { router as AccountsRouter };
