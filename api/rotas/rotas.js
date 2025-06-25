import express from "express";
import { insereusuario,insereendereco,verifilogin } from "../requisições/requi.js";
const router = express.Router();
router.post("/insereusuario",insereusuario);
router.post("/insereendereco",insereendereco);
router.post("/verifilogin",verifilogin)
export default router;