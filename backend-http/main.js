import express from "express"
import bodyParser from "body-parser"
import registerRoutes from "./routes.js"



const app = express()
app.use(bodyParser.json())
// por algum motivo a biblioteca 'cors' nao funcionou de jeito nenhum
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})
const port = 8080

registerRoutes(app)

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`)
})