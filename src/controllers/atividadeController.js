import atividadeService from '../services/atividadeService.js'

const listarAtividades = async (req, res) => {
  try {
    const atividades = await atividadeService.listarAtividades(req.params.planejamentoId)
    res.status(200).json({
      mensagem: 'Atividades encontradas com sucesso!',
      dados: atividades
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar atividades', erro: error.message })
  }
}

const criarAtividade = async (req, res) => {
  try {
    const { planejamentoId } = req.params

    const dados = {
      ...req.body,
      planejamentoId
    }

    const nova = await atividadeService.criarAtividade(dados)
    res.status(201).json({
      mensagem: 'Atividade criada com sucesso!',
      dados: nova
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar atividade', erro: error.message })
  }
}

const atualizarAtividade = async (req, res) => {
  try {
    const atualizada = await atividadeService.atualizarAtividade(req.params.id, req.body)
    res.status(200).json({
      mensagem: 'Atividade atualizada com sucesso!',
      dados: atualizada
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar atividade', erro: error.message })
  }
}

const deletarAtividade = async (req, res) => {
  try {
    await atividadeService.deletarAtividade(req.params.id)
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
