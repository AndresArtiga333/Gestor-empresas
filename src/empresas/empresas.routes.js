import { Router } from "express";
import { registrarEmpresa, listarEmpresas, filtrarEmpresas } from "./empresas.controller.js";
import { registrarEmpresaValidator, listarEmpresasValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

router.get("/listarEmpresas", listarEmpresasValidator, listarEmpresas)

router.get("/filtrarEmpresasPorRecorrido", listarEmpresasValidator, filtrarEmpresas)

export default router