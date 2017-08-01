import React from 'react'
import Head from 'next/head'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Enviar email</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div>
          <form>
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
