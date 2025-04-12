import express from 'express'
import planejamentoDiarioController from '../controllers/planejamentoDiarioController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/:viagemId', authMiddleware, planejamentoDiarioController.listarPlanejamentos)
router.post('/', authMiddleware, planejamentoDiarioController.criarPlanejamento)
router.put('/:id', authMiddleware, planejamentoDiarioController.atualizarPlanejamento)
router.delete('/:id', authMiddleware, planejamentoDiarioController.deletarPlanejamento)

export default router
