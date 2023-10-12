import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import EmailService from "./src/EmailService.js"

dotenv.config()
const app = express()
const port = 3000

app.use(cors({
  origin: ['http://127.0.0.1:5173', "http://localhost:5173", "http://localhost:8080", process.env.BASE_URL],
  methods: ['POST'],
}));
app.use(express.json());

app.listen(port, () => {
  console.log(`Project running...`)

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.post('/require_budget', (req, res) => {
    try {
      const { email } = req.body
      if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw new Error('Email is invalid')
      }
      const emailService = new EmailService()
      emailService.sendEmailToBabi("babicarvalho.ink@gmail.com", req.body)
      
      res.send("Orçamento enviado com sucesso")
    } catch (error) {
      res.send(error)
    }
  })
})