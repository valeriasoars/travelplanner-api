import Gasto from '../models/Gasto.js'

const listarGastosPorViagem = async (viagemId) => {
  return await Gasto.find({ viagemId }).populate('categoriaGastoId')
}

const criarGasto = async (dados) => {
  return await Gasto.create(dados)
}

const atualizarGasto = async (id, dados) => {
  return await Gasto.findByIdAndUpdate(id, dados, { new: true })
}

const deletarGasto = async (id) => {
  return await Gasto.findByIdAndDelete(id)
}

export default {
  listarGastosPorViagem,
  criarGasto,
  atualizarGasto,
  deletarGasto
}
