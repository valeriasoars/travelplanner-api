import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ mensagem: "Acesso negado. Nenhum token fornecido." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuarioId = decoded.id
    next()
  } catch (error) {
    return res.status(400).json({ mensagem: "Token inválido." })
  }
}

export default authMiddleware