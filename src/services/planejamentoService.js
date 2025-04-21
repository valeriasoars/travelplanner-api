import PlanejamentoDiario from '../models/PlanejamentoDiario.js'

const listarPlanejamentos = async (viagemId) => {
  return await PlanejamentoDiario.find({ viagemId })
}

const criarPlanejamento = async (dados) => {
  return await PlanejamentoDiario.create(dados)
}

const atualizarPlanejamento = async (id, dados) => {
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
