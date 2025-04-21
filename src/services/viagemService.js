import Viagem from '../models/Viagem.js'

const criarViagem = async (dadosViagem) => {
  return await Viagem.create(dadosViagem)
}

const listarViagensPorUsuario = async (usuarioId, status) => {
  const filtro = { usuarioId }
  if (status) filtro.status = status
  return await Viagem.find(filtro)
}

const listarTodasViagens = async () => {
  return await Viagem.find()
}

const listarViagensPorUsuarioComFiltroStatus = async (usuarioId, status) => {
  const filtro = { usuarioId }
  if (status) filtro.status = status
  return await Viagem.find(filtro)
}

const obterViagemPorId = async (id) => {
  return await Viagem.findById(id)
}

const atualizarViagem = async (id, dadosAtualizados) => {
  return await Viagem.findByIdAndUpdate(id, dadosAtualizados, { new: true })
}

const deletarViagem = async (id) => {
  return await Viagem.findByIdAndDelete(id)
}

export default {
  criarViagem,
  listarViagensPorUsuario,
  listarTodasViagens,
  listarViagensPorUsuarioComFiltroStatus,
  obterViagemPorId,
  atualizarViagem,
  deletarViagem
}
