import express from "express";
import { insereusuario,insereendereco,verifilogin, buscarAgendamentos, buscarProfissionaisPorTipo } from "../requisições/requi.js";
const router = express.Router();
router.post("/insereusuario",insereusuario);
router.post("/insereendereco",insereendereco);
router.post("/verifilogin",verifilogin)
router.get("/agendamentos/:idusuario", buscarAgendamentos);
router.get("/profissionais/:tipo", buscarProfissionaisPorTipo);
export default router;