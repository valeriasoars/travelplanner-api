import express from 'express'
import atividadeController from '../controllers/atividadeController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * /atividade/{planejamentoId}:
 *   get:
 *     summary: Lista todas as atividades de um planejamento
 *     tags: [Atividade]
 *     parameters:
 *       - name: planejamentoId
 *         in: path
 *         required: true
 *         description: ID do planejamento
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Atividades encontradas com sucesso
 *       400:
 *         description: Erro ao buscar atividades
 */
router.get('/:planejamentoId', authMiddleware, atividadeController.listarAtividades)

/**
 * @swagger
 * /atividade/{planejamentoId}:
 *   post:
 *     summary: Cria uma nova atividade
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planejamentoId
 *               - nome
 *             properties:
 *               planejamentoId:
 *                 type: string
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               concluido:
 *                 type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 *       400:
 *         description: Erro ao criar atividade
 */
router.post('/:planejamentoId', authMiddleware, atividadeController.criarAtividade)

/**
 * @swagger
 * /atividade/{id}:
 *   put:
 *     summary: Atualiza uma atividade existente
 *     tags: [Atividade]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da atividade
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               concluido:
 *                 type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Atividade atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar atividade
 */
router.put('/:id', authMiddleware, atividadeController.atualizarAtividade)

/**
 * @swagger
 * /atividade/{id}:
 *   delete:
 *     summary: Deleta uma atividade
 *     tags: [Atividade]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da atividade
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Atividade deletada com sucesso
 *       400:
 *         description: Erro ao deletar atividade
 */
router.delete('/:id', authMiddleware, atividadeController.deletarAtividade)

export default router
