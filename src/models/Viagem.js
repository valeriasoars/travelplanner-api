import mongoose from 'mongoose';

const viagemSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  destino: {
    type: String,
    required: true
  },
  orcamentoTotal: {
    type: Number,
    required: true
  },
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['cancelada', 'concluída', 'em planejamento'],
    default: 'em planejamento'
  }
}, { timestamps: true });

const Viagem = mongoose.model('Viagem', viagemSchema);

export default Viagem;