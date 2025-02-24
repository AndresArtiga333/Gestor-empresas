import bcrypt from "bcrypt"
import Usuario from "../user/user.model.js";
import { generateJWT } from "../helpers/generate.jwt.js";   

export const login = async (req, res) =>{
    try{
        const {correo, contra} = req.body;

        const user = await Usuario.findOne({correo: correo})

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const contraseñaValida = await bcrypt.compare(contra, user.contra);
        if (!contraseñaValida) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }
        const token = await generateJWT(user._id)

        return res.status(200).json({
            message: "Inicio de sesión correctamente",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Inicio de sesion fallido",
            error: err.message
        })
    }
}