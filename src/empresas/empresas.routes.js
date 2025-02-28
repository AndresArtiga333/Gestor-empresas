import { Router } from "express";
import { registrarEmpresa, listarAndFiltrarEmpresas, editarEmpresa} from "./empresas.controller.js";
import { registrarEmpresaValidator, listarEmpresasValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

router.get("/filtrarEmpresas", listarEmpresasValidator, listarAndFiltrarEmpresas)

router.put("/editarEmpresa/:pid",  editarEmpresa)
export default router