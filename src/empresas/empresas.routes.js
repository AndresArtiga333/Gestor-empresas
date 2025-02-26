import { Router } from "express";
import { registrarEmpresa, listarEmpresas, filtrarEmpresasPorAño } from "./empresas.controller.js";
import { registrarEmpresaValidator, listarEmpresasValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

router.get("/listarEmpresas", listarEmpresasValidator, listarEmpresas)

router.get("/filtrarEmpresasPorRecorrido", listarEmpresasValidator, filtrarEmpresasPorAño)

export default router