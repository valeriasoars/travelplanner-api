import express from 'express'
import atividadeController from '../controllers/atividadeController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/:planejamentoId', authMiddleware, atividadeController.listarAtividades)
router.post('/', authMiddleware, atividadeController.criarAtividade)
router.put('/:id', authMiddleware, atividadeController.atualizarAtividade)
router.delete('/:id', authMiddleware, atividadeController.deletarAtividade)

export default router
