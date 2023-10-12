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
      subject: `Orçamento de tatuagem do ${userInfo.name}`,
      html: htmlBody,
      amp: `<!DOCTYPE html>
      ${htmlBody}
      `
    }

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }

      console.log('Message sent: %s', info.messageId)
    })
  }

  mountEmailBody(userInfo) {
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
        <p><strong>Nome do cliente:</strong> ${userInfo.name}</p>
        <p><strong>Email:</strong> ${userInfo.email}</p>
        <p><strong>Instagram:</strong> ${userInfo.instagram}</p>
        <p><strong>Parte do corpo:</strong> ${userInfo.bodyPart}</p>
        <p><strong>Tamanho do desenho:</strong> ${userInfo.size}</p>
        <p><strong>Observações:</strong> ${userInfo.obs}</p>
        <p><strong>Tipo de tattoo:</strong> ${userInfo.tattooType.join(", ")}</p>
        <p><strong>Dias disponíveis:</strong> ${userInfo.days.join(", ")}</p>
        <p><strong>Horários disponíveis:</strong> ${userInfo.hours.join(", ")}</p>
        <hr/>
        <h3>Referências do cliente</h3>
        ${userInfo.imgUrl.map((url) => `<img src="${url}" alt="Tattoo Image" style="max-width: 300px; max-height: 300px;" />`)}
      </div>
    </body>
    </html>
    `
  }
}