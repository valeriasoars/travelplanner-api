import * as usuarioService from "../services/usuarioService.js";

export const cadastrarUsuario = async (req, res) => {
  try {
    await usuarioService.cadastrarUsuario(req.body);
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" })
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao cadastrar usuário", erro: error.message })
  }
}

export const logarUsuario = async (req, res) => {
  try {
    const { usuario, token } = await usuarioService.logarUsuario(req.body)
    res.status(200).json({ mensagem: "Usuário logado com sucesso", token })
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (error.message === 'Senha incorreta') {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    return res.status(500).json({ mensagem: "Erro ao fazer login", erro: error.message });
  }
}

export const buscarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuario(req.usuarioId)
    res.status(200).json({ mensagem: "Usuário localizado", usuario })
  } catch (error) {
    res.status(404).json({ mensagem: error.message })
  }
}

export const atualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(
      req.usuarioId,
      req.body
    )
    res.status(200).json({ mensagem: "Usuário atualizado" })
  } catch (error) {
    res.status(404).json({ mensagem: error.message })
  }
}

const removerUsuario = async (req, res) => {
  try {
    await usuarioService.removerUsuario(req.usuarioId)
    res.status(200).json({ mensagem: "Usuário removido com sucesso" })
  } catch (error) {
    res.status(404).json({ mensagem: error.message })
  }
}

export default {
  cadastrarUsuario,
  logarUsuario,
  buscarUsuario,
  atualizarUsuario,
  removerUsuario,
}
