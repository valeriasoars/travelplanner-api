import mongoose from 'mongoose'

const AtividadeSchema = new mongoose.Schema({
  planejamentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlanejamentoDiario',
    required: true
  },
  atividade: {
    type: String,
    required: true
  },
  descricao: String,
  horario: String,
  local: String
})

export default mongoose.model('Atividade', AtividadeSchema)
