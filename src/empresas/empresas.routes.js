import { Router } from "express";
import { registrarEmpresa } from "./empresas.controller.js";
import { registrarEmpresaValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

export default router