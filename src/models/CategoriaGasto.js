import mongoose from 'mongoose'

const categoriaGastoSchema = new mongoose.Schema({
  nome: { type: String, required: true }
})

export default mongoose.model('CategoriaGasto', categoriaGastoSchema)