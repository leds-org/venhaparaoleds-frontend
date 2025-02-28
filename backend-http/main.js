import express from "express"
import bodyParser from "body-parser"
import registerRoutes from "./routes.js"
import cors from "cors"



const app = express()
app.use(bodyParser.json())
// nao consegui resolver. assim funcionou
app.use(cors({ origin: [
    "http://localhost",
    "http://localhost:3000",
    "http://10.7.0.4",
    "http://10.7.0.1"
] }))
const port = 8080

registerRoutes(app)

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`)
})