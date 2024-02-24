import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import EmailService from "./src/EmailService.js"
import { AnamneseEmailService } from './src/AnamneseEmailService.js'

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
      emailService.sendEmailToBabi("babicarvalho.ink@gmail.com", req.body);
      res.status(200).send(`Formulário de orçamento enviado com sucesso!`);
    } catch (error) {
      res.status(422).send("Erro ao enviar email.")
    }
  })

  app.post('/require_anamnese', (req, res) => {
    const emailService = new AnamneseEmailService();
    const tattoerEmail = req.body.tattooer;

    try {
      emailService.sendMailToTattooer(tattoerEmail, req.body);
      res.status(200).send(`Formulário de anamnese enviado com sucesso!`);
    } catch (error) {
      console.log(error)
      res.status(422).send("Erro ao enviar email.")
    }
  })
})