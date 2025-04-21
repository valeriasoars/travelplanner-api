import gastoService from '../services/gastoService.js'

const listarGastosPorViagem = async (req, res) => {
  try {
    const gastos = await gastoService.listarGastosPorViagem(req.params.viagemId)
    res.status(200).json({
      mensagem: 'Gastos encontrados com sucesso.',
      dados: gastos
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar gastos.', erro: error.message })
  }
}

const criarGasto = async (req, res) => {
  try {
    const novoGasto = await gastoService.criarGasto(req.body)
    res.status(201).json({
      mensagem: 'Gasto criado com sucesso.',
      dados: novoGasto
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar gasto.', erro: error.message })
  }
}

const atualizarGasto = async (req, res) => {
  try {
    const gastoAtualizado = await gastoService.atualizarGasto(req.params.id, req.body)

    if (!gastoAtualizado) {
      return res.status(404).json({ mensagem: 'Gasto não encontrado para atualização.' })
    }

    res.status(200).json({
      mensagem: 'Gasto atualizado com sucesso.',
      dados: gastoAtualizado
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar gasto.', erro: error.message })
  }
}

const deletarGasto = async (req, res) => {
  try {
    const gastoDeletado = await gastoService.deletarGasto(req.params.id)

    if (!gastoDeletado) {
      return res.status(404).json({ mensagem: 'Gasto não encontrado para exclusão.' })
    }

    res.status(200).json({ mensagem: 'Gasto deletado com sucesso.' })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar gasto.', erro: error.message })
  }
}

export default {
  listarGastosPorViagem,
  criarGasto,
  atualizarGasto,
  deletarGasto
}
