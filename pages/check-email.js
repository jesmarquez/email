import React from 'react'
import Head from 'next/head'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Enviar email</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.ico"/>
        </Head>
        <h2>Revisa tu email!</h2>
        <p>Hemos enviado un email!</p>
      </div>
    )
  }
}
