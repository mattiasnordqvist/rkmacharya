import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400" rel="stylesheet"></link>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* A little helper for netlify */}
        <form name="booking" method="POST"  data-netlify="true"
          data-netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="class" />
          <input type="hidden" name="date" />
          <input type="hidden" name="time" />
            <label>Name: <input type="text" name="name" /></label>   
            <label>Email: <input type="email" name="email" /></label>
            <label>Payment method: <select name="payment[]" multiple>
              <option value="dropin">Drop In</option>
              <option value="classcard">10 classcard</option>
              <option value="member">Monthly donator</option>
              <option value="firstTime">First time trial</option>
            </select></label>
            <label>Message: <textarea name="message"></textarea></label>
          </form>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
