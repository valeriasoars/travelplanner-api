import PlanejamentoDiario from '../models/PlanejamentoDiario.js'
import Viagem from '../models/Viagem.js'

const listarPlanejamentos = async (viagemId) => {
  return await PlanejamentoDiario.find({ viagemId })
}

const criarPlanejamento = async (dados) => {
  const {viagemId, data} = dados

  const dataPlanejamento = new Date(data)

  const viagem = await Viagem.findById(viagemId)
  if(!viagem){
    throw new Error("Viagem não encontrada.")
  }

  if (dataPlanejamento < viagem.dataInicio || dataPlanejamento > viagem.dataFim) {
    throw new Error("A data do planejamento deve estar dentro do período da viagem.")
  }

    //Verifica se já existe um planejamento para a mesma data e viagem.
  const conflito = await PlanejamentoDiario.findOne({
    viagemId,
    data: { $eq: dataPlanejamento}
  })

  if (conflito) {
    throw new Error("Já existe um planejamento para essa data nesta viagem.")
  }

  return await PlanejamentoDiario.create(dados)
}

const atualizarPlanejamento = async (id, dados) => {
  const { viagemId, data } = dados

  // Verifica se já existe outro planejamento para a mesma viagem e data,
  // excluindo o planejamento que está sendo atualizado (usando $ne para _id diferente).
  const conflito = await PlanejamentoDiario.findOne({
    _id: { $ne: id }, 
    viagemId,
    data: { $eq: new Date(data) }
  })

  if (conflito) {
    throw new Error("Já existe outro planejamento para essa data nesta viagem.")
  }
  return await PlanejamentoDiario.findByIdAndUpdate(id, dados, { new: true })
}

const deletarPlanejamento = async (id) => {
  return await PlanejamentoDiario.findByIdAndDelete(id)
}

export default {
  listarPlanejamentos,
  criarPlanejamento,
  atualizarPlanejamento,
  deletarPlanejamento
}
