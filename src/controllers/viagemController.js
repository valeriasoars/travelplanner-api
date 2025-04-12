import Viagem from '../models/Viagem.js';

export const criarViagem = async (req, res) => {
  try {
    const novaViagem = await Viagem.create(req.body);
    res.status(201).json({ mensagem: 'Viagem criada com sucesso!', viagem: novaViagem });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar viagem.', detalhe: error.message });
  }
};

export const listarViagensPorUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  const { status } = req.query;

  try {
    const filtro = { usuarioId };
    if (status) filtro.status = status;

    const viagens = await Viagem.find(filtro);
    res.status(200).json({ mensagem: 'Viagens encontradas com sucesso.', viagens });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao buscar viagens.', detalhe: error.message });
  }
};

export const listarTodasViagens = async (req, res) => {
  try {
    const viagens = await Viagem.find();
    res.status(200).json({ mensagem: 'Lista de todas as viagens.', viagens });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar viagens.', detalhe: error.message });
  }
};

export const listarViagensPorUsuarioComFiltroStatus = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { status } = req.query;

    const filtro = { usuarioId };
    if (status) filtro.status = status;

    const viagens = await Viagem.find(filtro);
    res.status(200).json({ mensagem: 'Viagens filtradas encontradas com sucesso.', viagens });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar viagens com filtro.', detalhe: error.message });
  }
};

export const obterViagemPorId = async (req, res) => {
  try {
    const viagem = await Viagem.findById(req.params.id);
    if (!viagem) return res.status(404).json({ erro: 'Viagem não encontrada.' });

    res.status(200).json({ mensagem: 'Viagem encontrada com sucesso.', viagem });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao buscar viagem.', detalhe: error.message });
  }
};

export const atualizarViagem = async (req, res) => {
  try {
    const viagemAtualizada = await Viagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!viagemAtualizada) return res.status(404).json({ erro: 'Viagem não encontrada para atualização.' });

    res.status(200).json({ mensagem: 'Viagem atualizada com sucesso.', viagem: viagemAtualizada });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar viagem.', detalhe: error.message });
  }
};

export const deletarViagem = async (req, res) => {
  try {
    const viagemRemovida = await Viagem.findByIdAndDelete(req.params.id);
    if (!viagemRemovida) return res.status(404).json({ erro: 'Viagem não encontrada para exclusão.' });

    res.status(200).json({ mensagem: 'Viagem deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao deletar viagem.', detalhe: error.message });
  }
};

export default {
  criarViagem,
  listarViagensPorUsuario,
  listarTodasViagens,
  listarViagensPorUsuarioComFiltroStatus,
  obterViagemPorId,
  deletarViagem,
  atualizarViagem
};
