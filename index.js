const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const path = require('path')
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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.port || 4000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})