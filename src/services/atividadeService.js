import Atividade from '../models/Atividade.js'

const listarAtividades = async (planejamentoId) => {
  return await Atividade.find({ planejamentoId })
}

const criarAtividade = async (dados) => {
  return await Atividade.create(dados)
}

const atualizarAtividade = async (id, dados) => {
  return await Atividade.findByIdAndUpdate(id, dados, { new: true })
}

const deletarAtividade = async (id) => {
  return await Atividade.findByIdAndDelete(id)
}

export default {
  listarAtividades,
  criarAtividade,
  atualizarAtividade,
  deletarAtividade
}
