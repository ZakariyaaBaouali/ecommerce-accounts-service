import { Router } from "express";
import { AccountController } from "../controller";
import passport from "passport";
import { AccountMiddleware } from "../middlewares";

//✅✅✅
const router = Router();
const controller = new AccountController();
const middleware = new AccountMiddleware();

//account ✅✅
router.get("/", middleware.getAccount, controller.getAccounts);

router.post("/create", controller.createAccount);

router.get("/login", controller.loginAccount);

router.delete("/delete", middleware.getAccount, controller.deleteAccount);

//avatar ✅✅
router.patch("/avatar", middleware.getAccount, controller.addAccountAvatar);

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
    failureRedirect: "/google/failed",
  }),
  controller.getGoogleAccount
);

router.get("/google/failed", controller.failedGoogleLogin);

export { router as AccountsRouter };
