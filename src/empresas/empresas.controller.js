import Empresas from "./empresas.model.js";

export const registrarEmpresa = async (req, res) => {
    try {
        const {nombre, nivelDeImpacto, categoriaEmpresarial, añoDeFundacion} = req.body;
        const nuevaEmpresa = new Empresas({nombre, nivelDeImpacto, categoriaEmpresarial, añoDeFundacion});
        await nuevaEmpresa.save();
        res.status(201).json({
            success: true,
            message: "Empresa creada con éxito",
            data: nuevaEmpresa
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: error.message
        })
    }
}

export const listarEmpresas = async (req, res) => {
    try {
        const empresas = await Empresas.find();
        res.status(200).json({
            success: true,
            message: "Empresas obtenidas con éxito",
            data: empresas
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: error.message
        })
    }
}

