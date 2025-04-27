import express from 'express'
import usuarioController from '../controllers/usuarioController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// publicas 

/**
 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário
 */
router.post("/cadastrar", usuarioController.cadastrarUsuario)

/**
 * @swagger
 * /usuario/logar:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro ao fazer login
 */
router.post("/logar", usuarioController.logarUsuario)

// privadas

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Busca o usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário localizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/', authMiddleware, usuarioController.buscarUsuario)

/**
 * @swagger
 * /usuario:
 *   put:
 *     summary: Atualiza informações do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/', authMiddleware, usuarioController.atualizarUsuario)

/**
 * @swagger
 * /usuario:
 *   delete:
 *     summary: Remove o usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/', authMiddleware, usuarioController.removerUsuario)

export default router
