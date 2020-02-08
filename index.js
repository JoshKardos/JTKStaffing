const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <h3>Admin ID </h3>
      <p> ${req.body.adminId} </p>
      <p> ${req.body.name}</p>
      <a href=${req.body.downloadUrl}>Click to download</p>
    `
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: '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'
      })
    )
    const mailOptions = {
      from: 'JTK Staffing <joshkardos@gmail.com>',
      to: 'joshkardos@gmail.com',
      replyTo: 'noreply@gmail.com',
      subject: 'New Message',
      text: req.body.adminId,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err)
      console.log('Email sent')
    })
  })
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})