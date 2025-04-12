import express from 'express'
import gastoController from '../controllers/gastoController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/:viagemId', authMiddleware, gastoController.listarGastosPorViagem)
router.post('/', authMiddleware, gastoController.criarGasto)
router.put('/:id', authMiddleware, gastoController.atualizarGasto)
router.delete('/:id', authMiddleware,  gastoController.deletarGasto)

export default router
