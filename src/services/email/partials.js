// reusable email sections

// Head Section
const HEAD = `
  <mj-head>
    <mj-font name="Raleway" href="https://fonts.googleapis.com/css?family=Raleway" />
    <mj-font name="Pacifico" href="https://fonts.googleapis.com/css?family=Pacifico" />
  </mj-head>
`

// Header with brand logo
const HEADER = `
  <mj-section background-color="#29FFA6">
    <mj-column>
      <mj-image src="https://s3-us-west-1.amazonaws.com/shopping-site/assets/buddha-logo.png" width="125px" padding="20px 0"></mj-image>
      <mj-text align="center" color="#333333" font-family="Pacifico, Arial" font-size="40px">Anne's Handmade</mj-text>
    </mj-column>
  </mj-section>
`

// Footer
const FOOTER = `<mj-section background-color="#29FFA6"></mj-section>`

module.exports = {
  HEAD,
  HEADER,
  FOOTER
}
