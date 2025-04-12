import mongoose from 'mongoose'

const gastoSchema = new mongoose.Schema({
  viagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Viagem', required: true },
  categoriaGastoId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriaGasto', required: true },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true }
});

export default mongoose.model('Gasto', gastoSchema)