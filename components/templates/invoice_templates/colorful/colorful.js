export const colorful_template = (
    company_name, company_address, company_email, company_logo,
    client_name, client_address, client_email,
    tasks, subtotal, tax, total, note, dox
) => `
<!-- template colorful -->
<html lang="en">
<body style="padding: 2rem;">

  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
    <div style="text-align: left;">
      <h1 style="font-size: 1.25rem; font-weight: bold; color: #1E40AF;">${company_name}</h1>
      <p style="color: #34D399;">${company_address}</p>
      <p style="color: #A78BFA;">${company_email}</p>
    </div>
    <div style="text-align: right;">
      <img src=${company_logo} alt="Company Logo" style="height: 4rem;">
    </div>
  </div>
  <div style="text-align: center; margin-bottom: 3rem;">
    <h2 style="font-size: 2.5rem; font-weight: bold;">${dox}</h2>
  </div>
  <div style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem;">To:</h2>
    <p>${client_name}</p>
    <p>${client_address}</p>
    <p>${client_email}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
    <thead>
      <tr style="background-color: aqua;">
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Task</th>
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Amount</th>
      </tr>
    </thead>
    <tbody>
    ${tasks?.map(item => {
        return `<tr>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">${item.text}</td>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${item.number} ${item.quantity > 1 ? (`<span style="color:gray;margin-left:4px; margin-right:4px; font-size:10px;"> (x${item.quantity})</span>`) : ''} ${item.tax === true ? (`<span style="background-color:aqua; color: gray;margin-left:4px; margin-right:4px; padding:4px; border-radius:4px;font-size:10px;"> GST $${(item.number * item.quantity) * 0.05}</span>`) : ''}</td>
        </tr>`
    }).join('')}
    <tr>
        <td style="padding: 0.5rem 1rem; border: 1px solid black;">${note}</td>
    </tr>
    </tbody>
  </table>

  <div style="margin-top: 3rem; text-align: right;">
    <p style="margin-bottom: 0.5rem;">Subtotal: $${subtotal}</p>
    <p style="margin-bottom: 0.5rem;">Tax: $${tax}</p>
    <p style="font-weight: bold;">Total: $${total}</p>
  </div>

  <div style="margin-top: 3rem; text-align: center; font-size: 0.75rem; color: #6B7280;">
    <p>&copy; 2023 ${company_name}. All rights reserved.</p>
  </div>

</body>
</html>
`