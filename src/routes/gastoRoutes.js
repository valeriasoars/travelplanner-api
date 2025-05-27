import express from 'express'
import gastoController from '../controllers/gastoController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * /gastos/{viagemId}:
 *   get:
 *     summary: Lista todos os gastos de uma viagem
 *     tags: [Gasto]
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
 *         description: Gastos encontrados com sucesso
 *       400:
 *         description: Erro ao buscar gastos
 */
router.get('/:viagemId', authMiddleware, gastoController.listarGastosPorViagem)


router.get('/saldo/:viagemId', authMiddleware, gastoController.obterSaldoRestante)

/**
 * @swagger
 * /gastos/{viagemId}:
 *   post:
 *     summary: Cria um novo gasto
 *     tags: [Gasto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoriaGastoId
 *               - valor
 *               - descricao
 *             properties:
 *               viagemId:
 *                 type: string
 *               categoriaGastoId:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *               descricao:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Gasto criado com sucesso
 *       400:
 *         description: Erro ao criar gasto
 */
router.post('/:viagemId', authMiddleware, gastoController.criarGasto)

/**
 * @swagger
 * /gasto/{id}:
 *   put:
 *     summary: Atualiza um gasto existente
 *     tags: [Gasto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do gasto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 format: float
 *               descricao:
 *                 type: string
 *               categoriaGastoId:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gasto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar gasto
 *       404:
 *         description: Gasto não encontrado para atualização
 */
router.put('/:id', authMiddleware, gastoController.atualizarGasto)

/**
 * @swagger
 * /gasto/{id}:
 *   delete:
 *     summary: Deleta um gasto
 *     tags: [Gasto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do gasto
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gasto deletado com sucesso
 *       400:
 *         description: Erro ao deletar gasto
 *       404:
 *         description: Gasto não encontrado para exclusão
 */
router.delete('/:id', authMiddleware, gastoController.deletarGasto)

export default router
