import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";  
import { handleErrors } from "./handleErrors.js";  

export const loginValidator = [
    body("correo").notEmpty().isEmail().withMessage("Correo invalido"),
    validarCampos,
    handleErrors
]