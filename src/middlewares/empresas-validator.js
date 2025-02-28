import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { hasRoles } from "./validar-roles.js";
import { validateJWT } from "./validate-jwt.js";

export const registrarEmpresaValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("nivelDeImpacto").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("categoriaEmpresarial").notEmpty().withMessage("La categoria empresarial es requerida"),
    body("añoDeFundacion").notEmpty().withMessage("El año de fundación es requerido"),
    validarCampos
]

export const listarEmpresasValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos
]

export const filtrarEmpresasValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos
]

export const editarEmpresaValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos
]