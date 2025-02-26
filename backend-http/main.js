import pg from "pg"
const { Client } = pg
import express from "express"



const app = express()
const port = 8080
app.get('/', async (req, res) => {
    const client = new Client()

    await client.connect()
    console.log("conectou")

    const val = (await client.query("SELECT NOW()")).rows
    await client.end()
    res.send(JSON.stringify(val))
})

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`)
})