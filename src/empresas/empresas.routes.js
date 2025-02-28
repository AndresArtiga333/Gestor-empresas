import { Router } from "express";
import { registrarEmpresa, listarAndFiltrarEmpresas, editarEmpresa } from "./empresas.controller.js";
import { registrarEmpresaValidator, listarEmpresasValidator, editarEmpresaValidator } from "../middlewares/empresas-validator.js";

const router = Router();

/**
 * @swagger
 * /registrarEmpresa:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Empresa Ejemplo"
 *               nivelDeImpacto:
 *                 type: string
 *                 example: "Alto"
 *               categoriaEmpresarial:
 *                 type: string
 *                 example: "Tecnología"
 *               añoDeFundacion:
 *                 type: number
 *                 example: "2000"
 *     responses:
 *       201:
 *         description: Empresa creada con éxito
 *       500:
 *         description: Error al crear la empresa
 */
router.post("/registrarEmpresa", registrarEmpresaValidator, registrarEmpresa)

/**
 * @swagger
 * /filtrarEmpresas:
 *   get:
 *     summary: Listar y filtrar empresas
 *     tags: [Empresas]
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: Mínimo años de trayectoria
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: Máximo años de trayectoria
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoría empresarial
 *       - in: query
 *         name: ordenAZ
 *         schema:
 *           type: boolean
 *         description: Ordenar por nombre de A a Z
 *       - in: query
 *         name: ordenZA
 *         schema:
 *           type: boolean
 *         description: Ordenar por nombre de Z a A
 *     responses:
 *       200:
 *         description: Empresas filtradas con éxito
 *       500:
 *         description: Error al obtener las empresas
 */
router.get("/filtrarEmpresas", listarEmpresasValidator, listarAndFiltrarEmpresas)

/**
 * @swagger
 * /editarEmpresa/{pid}:
 *   put:
 *     summary: Editar una empresa existente
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               nivelDeImpacto:
 *                 type: string
 *               categoriaEmpresarial:
 *                 type: string
 *               añoDeFundacion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Empresa editada con éxito
 *       403:
 *         description: La empresa no existe
 *       500:
 *         description: Error al editar la empresa
 */
router.put("/editarEmpresa/:pid", editarEmpresaValidator, editarEmpresa)

export default router