import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./src/config/database.js"

import usuarioRoutes from "./src/routes/usuarioRoutes.js"
import viagemRoutes from './src/routes/viagemRoutes.js'
import categoriaGastoRoutes from './src/routes/categoriaGastoRoutes.js'
import gastoRoutes from './src/routes/gastoRoutes.js'
import planejamentoDiarioRoutes from './src/routes/planejamentoDiarioRoutes.js'
import atividadeRoutes from './src/routes/atividadeRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/usuario", usuarioRoutes)
app.use("/viagem", viagemRoutes)
app.use('/categoria-gasto', categoriaGastoRoutes)
app.use('/gastos', gastoRoutes)
app.use('/planejamento-diario', planejamentoDiarioRoutes)
app.use('/atividade', atividadeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))