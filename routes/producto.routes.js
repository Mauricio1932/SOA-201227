import { Router } from 'express';
import bodyParser from 'body-parser';
import { productoController } from '../controllers/producto.controller.js';
import jwt from 'jsonwebtoken';
import  verifyToken  from '../middlewares/token.middleware.js'

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/producto/viewAll':
 *  get:
 *     tags:
 *     - producto
 *     summary: visualizar productos
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/viewAll', (req, res) => productoController.prod_viewAll(req, res));

/**
 * @openapi
 * '/api/producto/viewProd':
 *   get:
 *     tags:
 *       - producto
 *     summary: Obtener producto
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Condición de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Solicitud incorrecta
 */

router.get('/viewProd', (req, res) => productoController.viewProd(req, res));


/**
 * @openapi
 * '/api/producto/createProd':
 *  post:
 *     tags:
 *     - producto
 *     summary: Crear producto
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         description: Token de autorización
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - titulo
 *              - descripcion
 *              - fechaCreacion
 *              - estado
 *            properties:
 *              titulo:
 *                type: string
 *                default: hola
 *              descripcion:
 *                type: string
 *                default: Leer
 *              fechaCreacion:
 *                type: string
 *                default: 10/enero/2023
 *              estado:
 *                type: boolean
 *                default: true
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/createProd', verifyToken,(req, res) => productoController.prod_create(req, res));

/**
 * @openapi
 * '/api/producto/updateProd':
 *  put:
 *     tags:
 *     - producto
 *     summary: actualizar tarea
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Condición de búsqueda
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - titulo
 *              - descripcion
 *              - fechaCreacion
 *              - estado
 *            properties:
 *              titulo:
 *                type: string
 *                default: hola
 *              descripcion:
 *                type: string
 *                default: estudiar
 *              fechaCreacion:
 *                type: string
 *                default: 20/agosto/2023
 *              estado:
 *                type: boolean
 *                default: true
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/updateProd', (req,res) => productoController.prod_update(req,res));


/**
 * @openapi
 * '/api/producto/deleteProd':
 *   delete:
 *     tags:
 *       - producto
 *     summary: eliminar producto
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Condición de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Solicitud incorrecta
 */

router.delete('/deleteProd', (req, res) => productoController.prod_delete(req, res));

export default router;