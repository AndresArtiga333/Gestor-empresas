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