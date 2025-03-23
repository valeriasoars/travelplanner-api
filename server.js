import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./src/config/database.js"

import usuarioRoutes from "./src/routes/usuarioRoutes.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/usuario", usuarioRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))