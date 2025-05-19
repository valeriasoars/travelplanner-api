import Gasto from '../models/Gasto.js'
import Viagem from '../models/Viagem.js'

const listarGastosPorViagem = async (viagemId) => {
  return await Gasto.find({ viagemId }).populate('categoriaGastoId')
}

const criarGasto = async (dados) => {

  const {viagemId, valor} = dados

  const viagem = await Viagem.findById(viagemId)
  if(!viagem) throw new Error('Viagem não encontrada')

    const totalGastos = await Gasto.aggregate([
      {$match: { viagemId: viagem._id}},
      {$group: {_id:null, total:  {$sum: "$valor"}}}
    ])

    const valorAtualGasto = totalGastos[0]?.total || 0
    const valorFinal = valorAtualGasto + valor

    if(valorFinal > viagem.orcamentoTotal){
      throw new Error(`Gasto excede o orçamento. Orçamento: R$ ${viagem.orcamentoTotal}, Total atual: R$ ${valorAtualGasto}, Tentativa: R$ ${valor}`)
    }

  return await Gasto.create(dados)
}

const atualizarGasto = async (id, dados) => {
  const gastoAtual = await Gasto.findById(id)
  if(!gastoAtual) throw new Error('Gasto não encontrado')

  const viagem = await Viagem.findById(gastoAtual.viagemId)
  if(!viagem) throw new Error('Viagem não encontrada')

  const totalGastos = await Gasto.aggregate([
    { 
      $match: {
        viagemId: viagem._id, 
        _id: { $ne: gastoAtual._id}
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$valor"}
      }
    }
  ])

  const totalSemAtual = totalGastos[0]?.total || 0
  const novoTotal = totalSemAtual + dados.valor

  if(novoTotal > viagem.orcamentoTotal){
    throw new Error(`Atualização excede orçamento da viagem. Orçamento: R$ ${viagem.orcamento}, Total atual: R$ ${totalSemAtual}, Tentativa: R$ ${dados.valor}`)
  }

  return await Gasto.findByIdAndUpdate(id, dados, { new: true })
}

const deletarGasto = async (id) => {
  return await Gasto.findByIdAndDelete(id)
}


const obterSaldoRestante = async (viagemId) => {
  const viagem = await Viagem.findById(viagemId)
  if (!viagem) throw new Error('Viagem não encontrada.')

  const totalGastos = await Gasto.aggregate([
    { $match: { viagemId: viagem._id } },
    { $group: { _id: null, total: { $sum: "$valor" } } }
  ])

  const totalGasto = totalGastos[0]?.total || 0
  const saldoRestante = viagem.orcamentoTotal - totalGasto

  return {
    orcamento: viagem.orcamentoTotal,
    totalGasto,
    saldoRestante: parseFloat(saldoRestante.toFixed(2))
  }
}

export default {
  listarGastosPorViagem,
  criarGasto,
  atualizarGasto,
  deletarGasto,
  obterSaldoRestante
}
