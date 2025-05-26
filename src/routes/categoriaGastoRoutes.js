import express from 'express'
import categoriaGastoController from '../controllers/categoriaGastoController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * /categoria-gasto:
 *   get:
 *     summary: Lista todas as categorias de gasto
 *     tags: [Categoria de Gasto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categorias encontradas com sucesso
 *       500:
 *         description: Erro ao buscar categorias
 */
router.get('/', authMiddleware, categoriaGastoController.listarCategorias)

router.get('/:id', authMiddleware, categoriaGastoController.obterCategoriaPorId)

/**
 * @swagger
 * /categoria-gasto:
 *   post:
 *     summary: Cria uma nova categoria de gasto
 *     tags: [Categoria de Gasto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao criar categoria
 */
router.post('/', authMiddleware, categoriaGastoController.criarCategoria)

/**
 * @swagger
 * /categoria-gasto/{id}:
 *   put:
 *     summary: Atualiza uma categoria de gasto existente
 *     tags: [Categoria de Gasto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria de gasto
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar categoria
 *       404:
 *         description: Categoria não encontrada para atualização
 */
router.put('/:id', authMiddleware, categoriaGastoController.atualizarCategoria)

/**
 * @swagger
 * /categoria-gasto/{id}:
 *   delete:
 *     summary: Deleta uma categoria de gasto
 *     tags: [Categoria de Gasto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria de gasto
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       400:
 *         description: Erro ao deletar categoria
 *       404:
 *         description: Categoria não encontrada para exclusão
 */
router.delete('/:id', authMiddleware, categoriaGastoController.deletarCategoria)

export default router
