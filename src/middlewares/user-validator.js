import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";    

export const loginValidator = [
    body("correo").notEmpty().isEmail().withMessage("Correo invalido"),
    validarCampos
]