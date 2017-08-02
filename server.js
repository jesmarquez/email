'use strict'

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(()=> {

  server = express()

  server.get('/sendemail', (req, res) => {
    
  })

})
