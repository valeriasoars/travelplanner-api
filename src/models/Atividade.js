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

// Índice composto para otimizar consultas por planejamentoId e horário

//Esse índice é criado porque a aplicação frequentemente realiza consultas para verificar se já existe
// alguma atividade no mesmo planejamentoId e horario, como na função atualizarAtividade.

AtividadeSchema.index({ planejamentoId: 1, horario: 1 })

export default mongoose.model('Atividade', AtividadeSchema)
