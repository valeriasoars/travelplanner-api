import express from 'express'
import categoriaGastoController from '../controllers/categoriaGastoController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/', authMiddleware, categoriaGastoController.listarCategorias)
router.post('/', authMiddleware, categoriaGastoController.criarCategoria)
router.put('/:id', authMiddleware, categoriaGastoController.atualizarCategoria)
router.delete('/:id', authMiddleware, categoriaGastoController.deletarCategoria)

export default router
