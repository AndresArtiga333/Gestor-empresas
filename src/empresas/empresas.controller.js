import Empresas from "./empresas.model.js";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

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

export const listarAndFiltrarEmpresas = async (req, res) => {
    try {
        const {min, max, categoria, ordenAZ, ordenZA} = req.body;
        let filtro = {};

        if (categoria !== undefined){
            filtro.categoriaEmpresarial = categoria;
        }
        if (min !== undefined){
            filtro.añosDeTrayectoria = {$gte: parseInt(min)};
        }
        if (max !== undefined){
            filtro.añosDeTrayectoria = {...filtro.añosDeTrayectoria, $lte: parseInt(max)};
        }
        let orden = {}; 

        if (ordenAZ) {
            orden.nombre = 1; 
        } else if (ordenZA) {
            orden.nombre = -1;
        }

        orden.añosDeTrayectoria = 1;
        const empresas = await Empresas.find(filtro).sort(orden);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');
        worksheet.columns = [
            {header: 'Nombre', key: 'nombre', width: 30},
            {header: 'Nivel de impacto', key: 'nivelDeImpacto', width: 30},
            {header: 'Categoria empresarial', key: 'categoriaEmpresarial', width: 30},
            {header: 'Año de fundación', key: 'añoDeFundacion', width: 30},
            {header: 'Años de trayectoria', key: 'añosDeTrayectoria', width: 30}
        ];

        empresas.forEach(empresa => {
            worksheet.addRow(empresa);
        });

        const directoryPath = path.join(path.resolve(), 'excel');
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath); 
        }
        const now = new Date();
        const año = now.getFullYear();
        const mes = String(now.getMonth() + 1).padStart(2, '0');  
        const dia = String(now.getDate()).padStart(2, '0');  
        const hora = String(now.getHours()).padStart(2, '0');  
        const minuto = String(now.getMinutes()).padStart(2, '0');  
        
        const fecha = `${año}-${mes}-${dia}_${hora}-${minuto}`;
        const filePath = path.join(directoryPath, `empresas_${fecha}.xlsx`);

        await workbook.xlsx.writeFile(filePath);
        res.status(200).json({
            success: true,
            message: "Empresas filtradas con éxito, el archivo se encuentra en la carpeta excel"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: error.message
        })
    }
}

export const editarEmpresa = async (req, res) => {
    try {
        const {pid} = req.params;
        const data = req.body;
        const empresaEditada = await Empresas.findByIdAndUpdate
        (pid, {$set: data}, {new: true});
        if (!empresaEditada) {
            return res.status(403).json({
                success: false,
                message: "La empresa no existe"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Empresa editada con éxito",
            empresaEditada
        });
    
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al editar la empresa",
            error: error.message
        })
    }
}