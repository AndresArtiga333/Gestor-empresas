import { Router } from "express";
import { registrarEmpresa, listarEmpresas, filtrarEmpresas, listarPorOrdenAlgabeticoAscendente,
    listarPorOrdenAlgabeticoDescendente
 } from "./empresas.controller.js";
import { registrarEmpresaValidator, listarEmpresasValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

router.get("/listarEmpresas", listarEmpresasValidator, listarEmpresas)

router.get("/filtrarEmpresas", listarEmpresasValidator, filtrarEmpresas)

router.get("/listarPorOrdenAlfabeticoAscendente", listarEmpresasValidator, listarPorOrdenAlgabeticoAscendente)

router.get("/listarPorOrdenAlfabeticoDescendente", listarEmpresasValidator, listarPorOrdenAlgabeticoDescendente)

export default router