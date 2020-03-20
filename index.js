const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const path = require('path')
const app = express()
const ApiKeys = require('./ApiKeys')

const admin = require('firebase-admin')
const serviceAccount = require('./ServiceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/user/create', (req, res) => {
  const { email, password } = req.body
  admin.auth().createUser({
    email: email,
    password: password
  }).then((userRecord) => {
    res.status(200).send(userRecord).end()
  })
  .catch((error) => {
    res.status(500).send(error).end()
  })
})

app.post('/user/delete', (req, res) => {
  const { userId } = req.body
  admin.auth().deleteUser(userId).then(() => {
    res.status(200).send()
  })
  .catch((error) => {
    res.status(500).end()
  })
})

app.post('/api/form', (req, res) => {
  const { adminEmail, senderName, downloadUrl } = req.body 
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <div style="border: 1px solid grey; padding:12px;">
        <h3 style="text-align:center; text-decoration:underline">${senderName} just submitted a timesheet</h3>
        <div style="text-align: center;">
          <button style="height:60px; width:200px; margin: 0 auto;">
            <a style="text-decoration:none;" href=${downloadUrl}>Click to download</p>
          </button>
        </div>
      </div>
    `
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: ApiKeys.sendGridKey
      })
    )
    const toEmail = process.env.NODE_ENV === 'production' ? adminEmail : 'joshkardos@gmail.com'
    const mailOptions = {
      from: 'JTK Staffing <joshkardos@gmail.com>',
      to: toEmail,
      replyTo: 'noreply@gmail.com',
      subject: 'Timesheet submitted',
      text: adminEmail,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err)
      console.log(`Email sent to ${toEmail}`)
    })
  })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})