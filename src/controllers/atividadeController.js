import Atividade from '../models/Atividade.js'

export const listarAtividades = async (req, res) => {
  try {
    const atividades = await Atividade.find({ planejamentoId: req.params.planejamentoId })
    res.status(200).json({
      mensagem: 'Atividades encontradas com sucesso!',
      dados: atividades
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar atividades', erro: error.message })
  }
}

export const criarAtividade = async (req, res) => {
  try {
    const nova = await Atividade.create(req.body)
    res.status(201).json({
      mensagem: 'Atividade criada com sucesso!',
      dados: nova
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar atividade', erro: error.message })
  }
}

export const atualizarAtividade = async (req, res) => {
  try {
    const atualizada = await Atividade.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      mensagem: 'Atividade atualizada com sucesso!',
      dados: atualizada
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar atividade', erro: error.message })
  }
}

export const deletarAtividade = async (req, res) => {
  try {
    await Atividade.findByIdAndDelete(req.params.id)
    res.status(200).json({ mensagem: 'Atividade deletada com sucesso!' })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar atividade', erro: error.message })
  }
}

export default {
  listarAtividades,
  criarAtividade,
  atualizarAtividade,
  deletarAtividade
}
