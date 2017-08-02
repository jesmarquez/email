'use strict'

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
let server

app.prepare().then(()=> {
  server = express()

  server.post('/check-email', (req, res) => {
    console.log('POST send email!')
    //res.status(200).send('POST send email')

    sendVerificationEmail({
      mailserver: 'smtp.gmail.com',
      fromEmail: 'noreply@localhost.localdomain',
      toEmail: 'jesmqz@gmail.com',
      url: verificationUrl
    })
    return app.render(req, res, '/check-email')
  })

  server.all('*', (req, res) => {
    console.log('All!')
    return handle(req, res)
  })

  server.listen(3000, (err) => {
  if (err) throw err 
    console.log('> Ready on http://localhost:3000')
  })
})

// @TODO Argument validation
function sendVerificationEmail({mailserver, fromEmail, toEmail, url}) {
  nodemailer
  .createTransport(mailserver)
  .sendMail({
    to: toEmail,
    from: fromEmail,
    subject: 'Sign in link',
    text: 'Use the link below to sign in:\n\n' + url + '\n\n'
  }, function (err) {
    // @TODO Handle errors
    if (err) {
      console.log('Error sending email to ' + toEmail, err)
    }
  })
  // console.log('Generated sign in link ' + url + ' for ' + toEmail)
}