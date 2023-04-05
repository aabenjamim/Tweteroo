import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

const signs = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const sign = req.body
    signs.push(sign)
    res.send('OK')
})

app.post("/tweets", (req, res)=>{
    const tweet = req.body
    function adicionar(){
        const username = tweet.username
        if(signs.includes(username)){
            tweets.push(tweet)
            return 'OK'
        } else{
            return 'UNAUTHORIZED'
        }
    }
    res.send(adicionar())
})

app.get("/tweets", (req, res)=>{

})


app.listen(PORT, ()=>console.log(`O servidor está rodando na porta ${PORT}`))