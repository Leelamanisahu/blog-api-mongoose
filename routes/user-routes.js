import express from "express";
// const getAllUser = require("../controllers/user-controller");
// const signUp = require("../controllers/user-controller");

import { getAllUser, signUp, login } from "../controllers/user-controller";
// import { signUp } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);

router.post("/signUp", signUp);

router.post("/login", login);
export default router;
