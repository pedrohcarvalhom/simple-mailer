import nodemailer from 'nodemailer'

export default class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    })
  }

  sendEmailToBabi(destination, userInfo) {
    const htmlBody = this.mountEmailBody(userInfo)
    const mailOptions = {
      from: 'babicarvalho.ink@gmail.com',
      to: destination,
      subject: `Formulário de anamnese - ${userInfo.name}`,
      html: htmlBody,
      amp: `<!DOCTYPE html>
      ${htmlBody}
      `
    }

    console.log('enviando email para: ', userInfo.email)
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }

      console.log('Message sent: %s', info.messageId)
    })
  }

  mountEmailBody(userInfo) {
    const { name, birth, email, insta, tattooDate, cpf, amount, tattooer, deseases, piils, info, imageRights, covid } = userInfo
    return `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        h1 {
          color: #333;
        }
        p {
          margin: 5px 0;
        }
        img {
          max-width: 300px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Informações do Cliente</h1>
        <p><strong>Nome do cliente:</strong> ${name}</p>
        <p><strong>Data de nascimento:</strong> ${birth}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Instagram:</strong> ${insta}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>Valor da tatuagem:</strong> ${amount}</p>
        <p><strong>Data da tatuagem:</strong> ${tattooDate}</p>
        <p><strong>Doenças prévias:</strong> ${deseases.length ? deseases.join(", ") : "Não"}</p>
        <p><strong>Tatuador:</strong> ${tattooer}</p>
        <p><strong>Remédios:</strong> ${piils ? "Sim" : "Não"}</p>
        <p><strong>Concordou com os termos:</strong> ${imageRights && covid ? "Sim" : "Não"}</p>
        <p><strong>Informações adicionais:</strong> ${info}</p>
        <hr/>
      </div>
    </body>
    </html>
    `
  }
}