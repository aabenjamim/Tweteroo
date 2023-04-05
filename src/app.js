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

    function retornar(){
        if(tweets.length>10){
            const ultDez = tweets.slice(-10)
            for(let i=0; i<ultDez.length; i++){
                const nome = ultDez[i].username
                if(signs.includes(nome)){
                    const indice = signs.indexOf(nome)
                    const avatar = signs[indice].avatar
                    ultDez[i].avatar = avatar
                }
            }
            return ultDez
        } else if(tweets.length>0){
            for(let i=0; i<tweets.length; i++){
                const nome = tweets[i].username
                if(signs.includes(nome)){
                    const indice = signs.indexOf(nome)
                    const avatar = signs[indice].avatar
                    tweets[i].avatar = avatar
                }
            }
            return tweets
        }
         else {
            return tweets
        }
    }

    res.send(retornar())
})


app.listen(PORT, ()=>console.log(`O servidor está rodando na porta ${PORT}`))