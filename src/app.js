import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
const PORT = 5000

const tweets = []

app.post("/tweets", (req, res)=>{
    const tweet = req.body
    tweets.push(tweet)
    res.send('OK')
})

app.get("/tweets", (req, res)=>{
    
})


app.listen(PORT, ()=>console.log(`O servidor está rodando na porta ${PORT}`))