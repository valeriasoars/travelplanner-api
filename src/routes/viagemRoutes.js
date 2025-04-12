import express from 'express';
import viagemController from '../controllers/viagemController.js'
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router()


router.get('/', authMiddleware, viagemController.listarTodasViagens); 
router.get('/:usuarioId', authMiddleware, viagemController.listarViagensPorUsuario);
router.get('/detalhes/:id', authMiddleware, viagemController.obterViagemPorId);
router.get('/status/:usuarioId', authMiddleware, viagemController.listarViagensPorUsuarioComFiltroStatus); // GET /viagem/:usuarioId?status=nome

router.post('/', authMiddleware, viagemController.criarViagem);
router.put('/:id', authMiddleware, viagemController.atualizarViagem);
router.delete('/:id', authMiddleware, viagemController.deletarViagem);

export default router;
