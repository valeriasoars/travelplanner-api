import CategoriaGasto from '../models/CategoriaGasto.js'

const listarCategorias = async () => {
  return await CategoriaGasto.find()
}

const criarCategoria = async (dados) => {
  return await CategoriaGasto.create(dados)
}

const atualizarCategoria = async (id, dados) => {
  return await CategoriaGasto.findByIdAndUpdate(id, dados, { new: true })
}

const deletarCategoria = async (id) => {
  return await CategoriaGasto.findByIdAndDelete(id)
}

export default {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
}
