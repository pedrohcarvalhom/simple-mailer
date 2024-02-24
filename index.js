import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import EmailService from "./src/EmailService.js"

dotenv.config()
const app = express()
const port = 3000

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET'],
}));
app.use(express.json());

app.listen(port, () => {
  console.log(`Project running on port ${port}`)

  app.get('/', (req, res) => {
    console.log('GET request')
    res.send('Hello World!')
  })
  app.post('/require_budget', (req, res) => {
    const emailService = new EmailService()

    try {
      const response = emailService.sendEmailToBabi("babicarvalho.ink@gmail.com", req.body);
      res.send(`Formulário enviado com sucesso! Id da mensagem ${response.messageId}`);
    } catch (error) {
      res.send("Erro ao enviar email.")
    }
  })
})