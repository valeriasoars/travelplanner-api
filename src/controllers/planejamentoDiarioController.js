import PlanejamentoDiario from '../models/PlanejamentoDiario.js'

export const listarPlanejamentos = async (req, res) => {
  try {
    const planejamentos = await PlanejamentoDiario.find({ viagemId: req.params.viagemId })
    res.status(200).json({
      mensagem: 'Planejamentos encontrados com sucesso!',
      dados: planejamentos
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar planejamentos', erro: error.message })
  }
}

export const criarPlanejamento = async (req, res) => {
  try {
    const novo = await PlanejamentoDiario.create(req.body)
    res.status(201).json({
      mensagem: 'Planejamento criado com sucesso!',
      dados: novo
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar planejamento', erro: error.message })
  }
}

export const atualizarPlanejamento = async (req, res) => {
  try {
    const atualizado = await PlanejamentoDiario.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      mensagem: 'Planejamento atualizado com sucesso!',
      dados: atualizado
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar planejamento', erro: error.message })
  }
}

export const deletarPlanejamento = async (req, res) => {
  try {
    await PlanejamentoDiario.findByIdAndDelete(req.params.id)
    res.status(200).json({ mensagem: 'Planejamento deletado com sucesso!' })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar planejamento', erro: error.message })
  }
}

export default {
  listarPlanejamentos,
  criarPlanejamento,
  atualizarPlanejamento,
  deletarPlanejamento
}
