import express from 'express'
import usuarioController from '../controllers/usuarioController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// publicas 
router.post("/cadastrar", usuarioController.cadastrarUsuario)
router.post("/logar", usuarioController.logarUsuario)

// privadas
router.get('/:id', authMiddleware, usuarioController.buscarUsuario)
router.put('/:id', authMiddleware, usuarioController.atualizarUsuario)
router.delete('/:id', authMiddleware, usuarioController.removerUsuario)

export default router