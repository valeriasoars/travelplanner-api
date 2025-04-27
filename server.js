import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./src/config/database.js"

import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

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





const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'TravelPlannerAPI',
            version: '1.0.0',
            description: 'Documentação TravelPlannerAPI',
        },
        servers: [
            {
                url:`http://localhost:5000`
                 
            },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
    },
    apis: ['./src/routes/*.js'] 
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/usuario", usuarioRoutes)
app.use("/viagem", viagemRoutes)
app.use('/categoria-gasto', categoriaGastoRoutes)
app.use('/gastos', gastoRoutes)
app.use('/planejamento-diario', planejamentoDiarioRoutes)
app.use('/atividade', atividadeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Documentação da API em http://localhost:5000/api/docs`)
})
    
