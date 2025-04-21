import categoriaGastoService from '../services/categoriaGastoService.js'

const listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaGastoService.listarCategorias()
    res.status(200).json({
      mensagem: 'Categorias encontradas com sucesso.',
      dados: categorias
    })
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar categorias.', erro: error.message })
  }
}

const criarCategoria = async (req, res) => {
  try {
    const novaCategoria = await categoriaGastoService.criarCategoria(req.body)
    res.status(201).json({
      mensagem: 'Categoria criada com sucesso.',
      dados: novaCategoria
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar categoria.', erro: error.message })
  }
}

const atualizarCategoria = async (req, res) => {
  try {
    const categoria = await categoriaGastoService.atualizarCategoria(req.params.id, req.body)

    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada para atualização.' })
    }

    res.status(200).json({
      mensagem: 'Categoria atualizada com sucesso.',
      dados: categoria
    })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar categoria.', erro: error.message })
  }
}

const deletarCategoria = async (req, res) => {
  try {
    const categoriaDeletada = await categoriaGastoService.deletarCategoria(req.params.id)

    if (!categoriaDeletada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada para exclusão.' })
    }

    res.status(200).json({ mensagem: 'Categoria deletada com sucesso.' })
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar categoria.', erro: error.message })
  }
}

export default {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
}
