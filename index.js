const express = require("express")
const mysql = require("mysql2/promise")
const app = express()
app.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "escola"
})

app.get("/professores", async (req,res) =>{
    const [professores] = await db.execute("SELECT * FROM professores")
    return res.json(professores)
})

app. post("/professores", async (req,res) =>{
    const {nome} = req.body

    if(!nome){
        return res.status(400).json("nome não informado")
    }
    if(nome.length <= 2){
        return res.status(400).json("O nome é muito curto")
    }

    const resultado = await db.execute("INSERT INTO professores(nome) VALUES (?)", [nome])
   
    return res.status(201).json({id: resultado.insertId, nome})
})

app.listen(3000, () => console.log("A API está no ar"))