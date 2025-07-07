import express from "express";
import { insereusuario,insereendereco,verifilogin, buscarAgendamentos, buscarProfissionaisPorTipo,insereagendamento, buscarProfissionaisPorTipoeSubtipo,buscarDisponibilidadePorProfissional, selavaliacoes } from "../requisições/requi.js";
const router = express.Router();
router.post("/insereusuario",insereusuario);
router.post("/insereendereco",insereendereco);
router.post("/verifilogin",verifilogin)
router.get("/agendamentos/:idusuario", buscarAgendamentos);
router.get("/profissionais/:tipo", buscarProfissionaisPorTipo);
router.get("/disponibilidade/:idprofissional", buscarDisponibilidadePorProfissional);
router.get("/profissionalselecionado/:tipo/:subtipo", buscarProfissionaisPorTipoeSubtipo);
router.post("/insereagendamento",insereagendamento)
router.get("/selavaliacoes",selavaliacoes)

export default router;