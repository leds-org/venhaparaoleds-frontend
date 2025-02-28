import express from "express"
import bodyParser from "body-parser"
import registerRoutes from "./routes.js"



const app = express()
app.use(bodyParser.json())
const port = 8080

registerRoutes(app)

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`)
})