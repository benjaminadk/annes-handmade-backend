const mjml2html = require('mjml')
const { HEAD, HEADER, FOOTER } = require('./partials')
const makeLink = require('./makeLink')

module.exports = async resetToken => {
  const html = await mjml2html(`
  <mjml>
    ${HEAD}
    <mj-body>
      ${HEADER}
      <mj-section>
        <mj-column>
          <mj-text font-family='Raleway' font-size="36px">Here's your password reset link!</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-button font-family="Helvetica" font-size='20px' background-color="pink" color="#333">
              ${makeLink('Click To Reset Password', false, resetToken)}
          </mj-button>
        </mj-column>
      </mj-section>
      ${FOOTER}
    </mj-body>
  <mjml>
  `)
  return html.html
}
