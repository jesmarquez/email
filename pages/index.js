import React from 'react'
import Head from 'next/head'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.sendEmail = this.sendEmail.bind(this)
  }

  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  sendEmail(event) {
    event.preventDefault()
    console.log('sendEmail')
  }

  render() {
    return (
      <div>
        <Head>
          <title>Enviar email</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.ico"/>
        </Head>

        <div>
          <form method="post" action="/check-email">
            Has click para enviar email!
            <input type="submit" value="Enviar"/>
          </form>
        </div>
        <div>
          {this.props.userAgent}
        </div>
      </div>
    )
  }
}
