import CategoriaGasto from '../models/CategoriaGasto.js';

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaGasto.find();
    res.status(200).json({
      mensagem: 'Categorias encontradas com sucesso.',
      dados: categorias
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar categorias.', erro: error.message });
  }
};

export const criarCategoria = async (req, res) => {
  try {
    const novaCategoria = await CategoriaGasto.create(req.body);
    res.status(201).json({
      mensagem: 'Categoria criada com sucesso.',
      dados: novaCategoria
    });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar categoria.', erro: error.message });
  }
};

export const atualizarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaGasto.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada para atualização.' });
    }

    res.status(200).json({
      mensagem: 'Categoria atualizada com sucesso.',
      dados: categoria
    });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar categoria.', erro: error.message });
  }
};

export const deletarCategoria = async (req, res) => {
  try {
    const categoriaDeletada = await CategoriaGasto.findByIdAndDelete(req.params.id);

    if (!categoriaDeletada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada para exclusão.' });
    }

    res.status(200).json({ mensagem: 'Categoria deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar categoria.', erro: error.message });
  }
};

export default {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
};
