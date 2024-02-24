import BaseEmail from "./BaseEmail.js";

export default class EmailService extends BaseEmail {
  constructor() {
    super();
  }
  sendEmailToBabi(destination, userInfo) {
    const htmlBody = this.mountEmailBody(userInfo)
    const mailOptions = {
      from: 'babicarvalho.ink@gmail.com',
      to: destination,
      subject: `Formulário de orçamento - ${userInfo.name}`,
      html: htmlBody,
      amp: `<!DOCTYPE html>
      ${htmlBody}
      `
    }

    console.log('enviando email para: ', userInfo.email)
    this.sendMail(mailOptions, (err) => {
      if (err) {
        console.log('Erro ao enviar email: ', err)
      } else {
        console.log('Email de orçamento enviado para: ', userInfo.email)
      }
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