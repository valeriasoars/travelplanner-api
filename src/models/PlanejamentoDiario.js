import mongoose from 'mongoose'

const PlanejamentoDiarioSchema = new mongoose.Schema({
  viagemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Viagem',
    required: true
  },
  data: {
    type: Date,
    required: true
  }
})

export default mongoose.model('PlanejamentoDiario', PlanejamentoDiarioSchema)
