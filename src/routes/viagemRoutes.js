import express from 'express';
import viagemController from '../controllers/viagemController.js'
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router()


/**
 * @swagger
 * /viagem/minhas:
 *   get:
 *     summary: Listar viagens do usuário 
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Viagens
 *     responses:
 *       200:
 *         description: Viagens do usuário encontradas com sucesso
 *       401:
 *         description: Não autorizado (token inválido)
 */
router.get('/minhas', authMiddleware, viagemController.listarViagensDoUsuarioLogado);


/**
 * @swagger
 * /viagem/detalhes/{id}:
 *   get:
 *     summary: Obter detalhes de uma viagem
 *     security:
 *       - bearerAuth: []  # Token de autenticação necessário
 *     tags:
 *       - Viagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da viagem para obter detalhes
 *     responses:
 *       200:
 *         description: Detalhes da viagem encontrados
 *       404:
 *         description: Viagem não encontrada
 */
router.get('/detalhes/:id', authMiddleware, viagemController.obterViagemPorId);

/**
 * @swagger
 * /viagem/status/{usuarioId}:
 *   get:
 *     summary: Listar viagens de um usuário com filtro por status
 *     security:
 *       - bearerAuth: []  # Token de autenticação necessário
 *     tags:
 *       - Viagens
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro de status para as viagens
 *     responses:
 *       200:
 *         description: Viagens com status filtrado encontradas
 *       500:
 *         description: Erro ao buscar viagens com filtro
 */
router.get('/status/:usuarioId', authMiddleware, viagemController.listarViagensPorUsuarioComFiltroStatus); // GET /viagem/:usuarioId?status=nome

/**
 * @swagger
 * /viagem:
 *   post:
 *     summary: Criar uma nova viagem
 *     security:
 *       - bearerAuth: []  # Token de autenticação necessário
 *     tags:
 *       - Viagens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               destino:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *               data_fim:
 *                 type: string
 *     responses:
 *       201:
 *         description: Viagem criada com sucesso
 *       400:
 *         description: Erro ao criar viagem
 */
router.post('/', authMiddleware, viagemController.criarViagem);

/**
 * @swagger
 * /viagem/{id}:
 *   put:
 *     summary: Atualizar informações de uma viagem
 *     security:
 *       - bearerAuth: []  # Token de autenticação necessário
 *     tags:
 *       - Viagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da viagem a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               destino:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *               data_fim:
 *                 type: string
 *     responses:
 *       200:
 *         description: Viagem atualizada com sucesso
 *       404:
 *         description: Viagem não encontrada para atualização
 */
router.put('/:id', authMiddleware, viagemController.atualizarViagem);

/**
 * @swagger
 * /viagem/{id}:
 *   delete:
 *     summary: Deletar uma viagem
 *     security:
 *       - bearerAuth: []  # Token de autenticação necessário
 *     tags:
 *       - Viagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da viagem a ser deletada
 *     responses:
 *       200:
 *         description: Viagem deletada com sucesso
 *       404:
 *         description: Viagem não encontrada para deleção
 */
router.delete('/:id', authMiddleware, viagemController.deletarViagem);



//  * @swagger
//  * /viagem:
//  *   get:
//  *     summary: Listar todas as viagens
//  *     security:
//  *       - bearerAuth: []  # Token de autenticação necessário
//  *     tags:
//  *       - Viagens
//  *     responses:
//  *       200:
//  *         description: Lista de todas as viagens
//  *       401:
//  *         description: Não autorizado (token inválido)
//  *       500:
//  *         description: Erro ao buscar viagens
//  */
//router.get('/', authMiddleware, viagemController.listarTodasViagens);

export default router;
