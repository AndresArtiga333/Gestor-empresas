import { Schema, model } from "mongoose";

const userSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no puede pasar los 25 caracteres"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "El apellido no puede pasar los 25 caracteres"]
    },
    correo:{
        type: String,
        required: [true, "El correo es necesario"],
        unique: true
    },
    contra:{
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    rol:{
        type: String,
        required: true,
        enum: "ADMIN",
        default: "ADMIN"
    }
})

userSchema.methods.toJSON = function(){
    const {contra, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("Usuario", userSchema)