const mjml2html = require('mjml')
const { HEAD, HEADER, FOOTER } = require('./partials')
const makeLink = require('./makeLink')
const formatMoney = require('../../resolvers/utils/formatMoney')

// Generate table based on purchase
function makeTable(products) {
  const tables = products.map((product, i) => {
    return `<tr style="${
      i === products.length - 1 ? 'border-bottom:1px solid lightgrey;' : ''
    } text-align:center">
      <td style="padding: 10px;">
        <img src=${product.images[0]} width="50" />
      </td>
      <td style="padding: 0 25px 0 0;">${product.title}</td>
      <td style="padding: 0 15px;">${formatMoney(product.price)}</td>
    </tr>`
  })
  return tables.toString().replace(',', '')
}

// Generate Reciept for purchase
module.exports = async (products, orderId) => {
  const subTotal = products.reduce((acc, product) => acc + product.price, 0)
  const taxRate = 0.08
  const taxTotal = subTotal * taxRate
  const total = subTotal + taxTotal

  const html = await mjml2html(`
    <mjml>
        ${HEAD}
      <mj-body background-color="#f5f5f5">
        ${HEADER}
        <mj-section>
          <mj-column>
            <mj-text font-family='Raleway' font-size="18px">Thank You for your purchase! Here is a summary of your order.</mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-table>
              <tr style="border-bottom:1px solid lightgrey; text-align:center;padding:15px 0;">
                <th style="padding: 0 15px 0 0;">Product</th>
                <th style="padding: 0 15px 0 0;">Title</th>
                <th style="padding: 0 15px;">Price</th>
              </tr>
              ${makeTable(products)}
            </mj-table>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button font-family="Helvetica" background-color="pink" color="#333">
              ${makeLink('View Order', orderId)}
            </mj-button>
            <mj-button font-family="Helvetica" background-color="pink" color="#333">
              ${makeLink("Visit Anne's Handmade")}
            </mj-button>
          </mj-column>
          <mj-column>
            <mj-text font-family='Raleway' font-size="16px">
              Sub Total: ${formatMoney(subTotal)}
            </mj-text>
            <mj-text font-family='Raleway' font-size="16px">
              Tax Rate: 8.0%
            </mj-text>
            <mj-text font-family='Raleway' font-size="16px">
              Tax Total: ${formatMoney(taxTotal)}
            </mj-text>
            <mj-text font-family='Raleway' font-size="20px" font-weight="bold">
              Order Total: ${formatMoney(total)}
            </mj-text>
          </mj-column>
        </mj-section>
        ${FOOTER}
      </mj-body>
    </mjml>
  `)

  return html.html
}
