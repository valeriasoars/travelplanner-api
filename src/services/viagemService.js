import Usuario from '../models/Usuario.js'
import Viagem from '../models/Viagem.js'

const criarViagem = async (dadosViagem, usuarioId) => {
  const usuario = await Usuario.findById(usuarioId)
  if (!usuario) throw new Error("Usuário não encontrado")

   const {dataInicio, dataFim} = dadosViagem

  if (new Date(dataFim) < new Date(dataInicio)) {
    throw new Error("A data de fim não pode ser menor que a data de início.")
  }

   const viagensConflitantes = await Viagem.find({
    usuarioId,
    $or: [
      {
        dataInicio: {$lte: dataFim},
        dataFim: {$gte: dataInicio}
      }
    ]
   })

   if(viagensConflitantes.length > 0){
    throw new Error("Já existe uma viagem com essa data.")
   }

  const viagem = new Viagem({ ...dadosViagem, usuarioId })
  await viagem.save()
  return viagem
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
