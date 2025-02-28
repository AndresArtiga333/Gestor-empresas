import { Schema, model } from "mongoose";

const empresasSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no puede pasar los 25 caracteres"]
    },
    nivelDeImpacto:{
        type: String,
        required: [true, "El nivel de impacto es requerido"],
        enum: ["ALTO", "MEDIO", "BAJO"]
    },
    categoriaEmpresarial:{
        type: String,
        required: [true, "La categoria empresarial es requerida"]
    },
    añoDeFundacion:{
        type: Number,
        required: [true, "El año de fundación es requerido"],
        min: [1870, "El año de fundación no puede ser menor a 1870"]
    },
    añosDeTrayectoria:{
        type: Number,
        default: 0
    }
});

empresasSchema.pre('save', function(next) {
    if (this.nombre) {
        this.nombre = this.nombre.toLowerCase(); 
    }
    const añoActual = new Date().getFullYear();
    this.añosDeTrayectoria = añoActual - this.añoDeFundacion;
    next();
});

empresasSchema.post('findOneAndUpdate', async function (empresa) {
    if (empresa && empresa.añoDeFundacion) {
        const añoActual = new Date().getFullYear();
        empresa.añosDeTrayectoria = añoActual - empresa.añoDeFundacion;
        await empresa.save(); 
    }
});

export default model("Empresas", empresasSchema);