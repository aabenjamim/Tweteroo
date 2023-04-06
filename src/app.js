import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

const signs = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body
    const user = { username, avatar }
    signs.push(user)
    res.send('OK')
})

app.post("/tweets", (req, res)=>{
    const {username, tweet} = req.body
    function adicionar(){
        const sign = signs.find(sign => sign.username === username)
        if(sign){
            tweets.push({username, tweet})
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

                const user = tweets.find(use => use.username === nome)
                
                ultDez[i].avatar = user.avatar
            }

            return ultDez
        } 
        else if(tweets.length>0 && tweets.length<=10){

            for(let i=0; i<tweets.length; i++){
                const nome = tweets[i].username

                const user = tweets.find(use => use.username === nome)

                tweets[i].avatar = user.avatar
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