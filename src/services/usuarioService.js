import Usuario from "../models/Usuario.js";
import Viagem from "../models/Viagem.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const cadastrarUsuario = async ({ nome, email, senha, confirmarSenha }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Formato de e-mail inválido")
  }

  if(senha !== confirmarSenha){
    throw new Error("As senhas não conferem")
  }
  
  const usuarioExistente = await Usuario.findOne({ email })
  if (usuarioExistente) {
    throw new Error("Usuário já existe")
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = new Usuario({ nome, email, senha: senhaHash })
  await usuario.save()
  return usuario;
};

export const logarUsuario = async ({ email, senha }) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error("Usuário não encontrado")

  const senhaValida = await bcrypt.compare(senha, usuario.senha)
  if (!senhaValida) throw new Error("Senha incorreta")

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { usuario, token }
};

export const buscarUsuario = async (usuarioId) => {
  const usuario = await Usuario.findById(usuarioId)
  if (!usuario) throw new Error("Usuário não encontrado")
  return usuario
};

export const atualizarUsuario = async (usuarioId, dados) => {
  const usuario = await Usuario.findByIdAndUpdate(usuarioId, dados, {
    new: true,
  })
  if (!usuario) throw new Error("Usuário não encontrado")
  return usuario
}


export const removerUsuario = async (usuarioId) => {
  const usuario = await Usuario.findOneAndDelete({ _id: usuarioId })
  if (!usuario) {
    throw new Error("Usuário não encontrado")
  }
}