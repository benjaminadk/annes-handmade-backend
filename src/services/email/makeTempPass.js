const mjml2html = require('mjml')
const { HEAD, HEADER, FOOTER } = require('./partials')
const makeLink = require('./makeLink')

// when user signs up with google give them a password
module.exports = async (email, password) => {
  const html = await mjml2html(`
    <mjml>
      ${HEAD}
      <mj-body>
        ${HEADER}
         <mj-section>
          <mj-column>
            <mj-text font-family='Raleway' font-size="18px">Thank You for creating an account with use. You signed up with Google and can continue to sign in with your Google account. You can also sign in with the following credentials.</mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-text font-family="Raleway" font-size="30px" font-weight='bold'>Email: ${email}</mj-text>
            <mj-text font-family="Raleway" font-size="30px" font-weight='bold'>Password: ${password}</mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button font-family="Helvetica" font-size='20px' background-color="pink" color="#333">
              ${makeLink("Visit Anne's Handmade")}
            </mj-button>
          </mj-column>
        </mj-section>
        ${FOOTER}
      </mj-body>
    </mjml>
  `)
  return html.html
}
