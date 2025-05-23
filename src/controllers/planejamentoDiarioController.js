import planejamentoService from '../services/planejamentoService.js'

const listarPlanejamentos = async (req, res) => {
  try {
    const planejamentos = await planejamentoService.listarPlanejamentos(req.params.viagemId)
    res.status(200).json({
      mensagem: 'Planejamentos encontrados com sucesso!',
      dados: planejamentos
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar planejamentos', erro: error.message })
  }
}

const criarPlanejamento = async (req, res) => {
  try {
    const { data } = req.body
    const viagemId = req.params.viagemId

    const novo = await planejamentoService.criarPlanejamento({ viagemId, data })

    res.status(201).json({
      mensagem: 'Planejamento criado com sucesso!',
      dados: novo
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar planejamento', erro: error.message })
  }
}
const atualizarPlanejamento = async (req, res) => {
  try {
    const atualizado = await planejamentoService.atualizarPlanejamento(req.params.id, req.body)
    res.status(200).json({
      mensagem: 'Planejamento atualizado com sucesso!',
      dados: atualizado
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar planejamento', erro: error.message })
  }
}

const deletarPlanejamento = async (req, res) => {
  try {
    await planejamentoService.deletarPlanejamento(req.params.id)
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
