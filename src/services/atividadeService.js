import Atividade from '../models/Atividade.js'

const listarAtividades = async (planejamentoId) => {
  return await Atividade.find({ planejamentoId })
}

const criarAtividade = async (dados) => {
   const { planejamentoId, horario } = dados

  const conflito = await Atividade.findOne({ planejamentoId, horario })

  if (conflito) {
    throw new Error("Já existe uma atividade programada para este horário.")
  }

  return await Atividade.create(dados)
}

const atualizarAtividade = async (id, dados) => {
    const { planejamentoId, horario } = dados

  const conflito = await Atividade.findOne({
    _id: { $ne: id }, 
    planejamentoId,
    horario
  })

  if (conflito) {
    throw new Error("Já existe outra atividade neste horário.")
  }

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
