import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import UserController from "./user.controller";

const router = Router();
const userController = new UserController();

router.post("/registration", authMiddleware, async (req, res, next) => {
  return await userController.registration(req, res, next);
});
router.post("/login", async (req, res, next) => {
  return await userController.login(req, res, next);
});
router.post("/logout", async (req, res, next) => {
  return await userController.logout(req, res, next);
});
router.get("/refresh", async (req, res, next) => {
  return await userController.refresh(req, res, next);
});

export default router;
