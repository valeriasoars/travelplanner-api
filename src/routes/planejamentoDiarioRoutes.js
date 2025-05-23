import express from 'express'
import planejamentoDiarioController from '../controllers/planejamentoDiarioController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * /planejamento/{viagemId}:
 *   get:
 *     summary: Lista todos os planejamentos de uma viagem
 *     tags: [Planejamento Diário]
 *     parameters:
 *       - name: viagemId
 *         in: path
 *         required: true
 *         description: ID da viagem
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Planejamentos encontrados com sucesso
 *       400:
 *         description: Erro ao buscar planejamentos
 */
router.get('/:viagemId', authMiddleware, planejamentoDiarioController.listarPlanejamentos)

/**
 * @swagger
 * /planejamento/{viagemId}:
 *   post:
 *     summary: Cria um novo planejamento diário
 *     tags: [Planejamento Diário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - viagemId
 *               - data
 *               - atividades
 *             properties:
 *               viagemId:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               atividades:
 *                 type: array
 *                 items:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Planejamento criado com sucesso
 *       400:
 *         description: Erro ao criar planejamento
 */
router.post('/:viagemId', authMiddleware, planejamentoDiarioController.criarPlanejamento)

/**
 * @swagger
 * /planejamento/{id}:
 *   put:
 *     summary: Atualiza um planejamento diário existente
 *     tags: [Planejamento Diário]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do planejamento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *               atividades:
 *                 type: array
 *                 items:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Planejamento atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar planejamento
 */
router.put('/:id', authMiddleware, planejamentoDiarioController.atualizarPlanejamento)

/**
 * @swagger
 * /planejamento/{id}:
 *   delete:
 *     summary: Deleta um planejamento diário
 *     tags: [Planejamento Diário]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do planejamento
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Planejamento deletado com sucesso
 *       400:
 *         description: Erro ao deletar planejamento
 */
router.delete('/:id', authMiddleware, planejamentoDiarioController.deletarPlanejamento)

export default router
