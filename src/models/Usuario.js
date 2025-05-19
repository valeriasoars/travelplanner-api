import mongoose from "mongoose"
import Viagem from "./Viagem.js";
import Gasto from "./Gasto.js";
import PlanejamentoDiario from "./PlanejamentoDiario.js";
import Atividade from "./Atividade.js";

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
})

// Middleware para deletar em cascata
UsuarioSchema.pre("findOneAndDelete", async function (next) {
  const usuario = await this.model.findOne(this.getQuery());
  if (!usuario) return next();

  const viagens = await Viagem.find({ usuarioId: usuario._id });

  for (const viagem of viagens) {

    await Gasto.deleteMany({ viagemId: viagem._id });

    const planejamentos = await PlanejamentoDiario.find({ viagemId: viagem._id });

    for (const planejamento of planejamentos) {
      await Atividade.deleteMany({ planejamentoId: planejamento._id });
    }

    await PlanejamentoDiario.deleteMany({ viagemId: viagem._id });

    await Viagem.findByIdAndDelete(viagem._id);
  }

  next();
});

export default mongoose.model("Usuario", UsuarioSchema)