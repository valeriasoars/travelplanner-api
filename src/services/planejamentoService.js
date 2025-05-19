import PlanejamentoDiario from '../models/PlanejamentoDiario.js'

const listarPlanejamentos = async (viagemId) => {
  return await PlanejamentoDiario.find({ viagemId })
}

const criarPlanejamento = async (dados) => {
  const {viagemId, data} = dados

  const conflito = await PlanejamentoDiario.findOne({
    viagemId,
    data: { $eq: new Date(data)}
  })

  if (conflito) {
    throw new Error("Já existe um planejamento para essa data nesta viagem.")
  }

  return await PlanejamentoDiario.create(dados)
}

const atualizarPlanejamento = async (id, dados) => {
  const { viagemId, data } = dados

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
