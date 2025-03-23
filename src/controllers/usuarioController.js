import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha } = req.body
  
      const usuarioExistente = await Usuario.findOne({ email })
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: "Usuário já existe" })
      }
  
      const senhaHash = await bcrypt.hash(senha, 10)
  
      const usuario = new Usuario({
        nome,
        email,
        senha: senhaHash,
      });
  
      await usuario.save();
      res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" })
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao cadastrar usuário", erro: error.message })
    }
  }
  


  const logarUsuario = async (req, res) => {
    try {
      const { email, senha } = req.body
      const usuario = await Usuario.findOne({ email })
  
      if (!usuario) {
        return res.status(400).json({ mensagem: "Usuário não encontrado" })
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha)
      if (!senhaValida) {
        return res.status(400).json({ mensagem: "Senha incorreta" })
      }
  
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
  
      res.status(201).json({ mensagem: "Usuario logado com sucesso: ", token })
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao fazer login", erro: error.message })
    }
  }


  const buscarUsuario = async (req, res) => {
    try {
      const usuarioId = req.usuarioId
      const usuario = await Usuario.findById(usuarioId)
  
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
      }
      res.status(201).json({ mensagem: "Usuario localizado: ", usuario })
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error.message })
    }
  }
  

  const atualizarUsuario = async (req, res) => {
    try {
      const usuarioId = req.usuarioId
      const { nome, email, senha } = req.body
  
      const usuario = await Usuario.findByIdAndUpdate(
        usuarioId,
        { nome, email, senha }, 
        { new: true } 
      )
  
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
      }
  
      res.status(201).json({ mensagem: "Usuario atualizado: ", usuario })
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: error.message })
    }
  }
  

  const removerUsuario = async (req, res) => {
    try {
      const usuarioId = req.usuarioId
  
      const usuario = await Usuario.findByIdAndDelete(usuarioId)
  
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
      }
  
      res.json({ mensagem: "Usuário removido com sucesso" })
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao remover usuário", erro: error.message })
    }
  }
  

  export default { cadastrarUsuario, logarUsuario, buscarUsuario, atualizarUsuario, removerUsuario }