'use strict'

const express = require('express')
const next = require('next')
const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
let server

// If EMAIL_USERNAME and EMAIL_PASSWORD are configured use them to send email.
// e.g. For a Google Mail account (@gmail.com) set EMAIL_SERVICE to 'gmail'
// See nodemailer documentation for other values for EMAIL_SERVICE.
let mailserver = null

const EMAIL_SERVER = 'smtp.gmail.com'
const EMAIL_PORT = 465
const EMAIL_SECURE = true
const EMAIL_USERNAME = 'jesmqz@gmail.com'
const EMAIL_PASSWORD = 'j3Z@7!6s'

mailserver = smtpTransport({
  host: EMAIL_SERVER,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})


app.prepare().then(()=> {
  server = express()

  server.post('/check-email', (req, res) => {
    console.log('POST send email!')
    //res.status(200).send('POST send email')

    sendVerificationEmail({
      mailserver: mailserver,
      fromEmail: 'noreply@localhost.localdomain',
      toEmail: 'jesmqz@gmail.com',
      url: 'verificationUrl'
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