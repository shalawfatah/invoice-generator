export const colorful_template = (
    company_name, company_address, company_email, company_logo,
    client_name, client_address, client_email,
    tasks, subtotal, tax, total, note, dox, document_number, gst, signature, phone, website
) => `
<!-- template colorful -->
<html lang="en">
<body style="padding: 2rem;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
  <img src=${company_logo} alt="Company Logo" style="height: 3rem;">
  <p style="font-size: 2.25rem; font-weight: bold; margin: 0;">${dox}</p>
  <p></p>
</div>
<div style="display: flex; justify-content: center;">
  <h1 style="font-size: 3.25rem;">${company_name}</h1>
</div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
    <div style="text-align: left;">
      <p style="color: #34D399;">Address: ${company_address}</p>
    </div>
    <div style="text-align: right;">
    <p>GST: ${gst}</p>
    <p>${dox} Number: ${document_number}</p>
    </div>
  </div>
  <div style="margin-bottom: 3rem;">
    <h2 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem;">Bill To:</h2>
    <p>${client_name}</p>
    <p>${client_address}</p>
    <p>${client_email}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
    <thead>
      <tr style="background-color: #d4145a;">
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left; color:white;">Task</th>
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;color:white;">Amount</th>
      </tr>
    </thead>
    <tbody>
    ${tasks?.map(item => {
        return `<tr>
            <td style="padding: 0.5rem 1rem; border: 1px solid black; white-space: pre-line;">${item.text}</td>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${item.number} ${item.quantity > 1 ? (`<span style="color:gray;margin-left:4px; margin-right:4px; font-size:10px;"> (x${item.quantity})</span>`) : ''} ${item.tax === true ? (`<span style="background-color:aqua; color: gray;margin-left:4px; margin-right:4px; padding:4px; border-radius:4px;font-size:10px;"> GST $${((item.number * item.quantity) * 0.05).toFixed(2)}</span>`) : ''}</td>
        </tr>`
    }).join('')}
    <tr>
        <td style="padding: 0.5rem 1rem; border: 1px solid black;">${note}</td>
    </tr>
    <tr>
    <td style="padding: 0.5rem 1rem; border: 1px solid black;">Subtotal</td>
    <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${subtotal}</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem 1rem; border: 1px solid black;">GST</td>
      <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${tax}</td>
    </tr>
    <tr style="background-color: #d4145a;">
      <td style="padding: 0.5rem 1rem; border: 1px solid black; font-weight:bold; color:white;font-size:2rem;">Total</td>
      <td style="padding: 0.5rem 1rem; border: 1px solid black; font-weight:bold; color:white;font-size:2rem;">$${total}</td>
    </tr>
    </tbody>
  </table>
  <div style="margin-top: 5rem; margin-bottom: 5rem;">
      <p>For questions regarding this invoice, please contact ${company_name}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${company_email}</p>
      <p>Website: ${website}</p>
  </div>
  <div style="display: flex; justify-content: end;">
    <img src=${signature} alt="Company Logo" style="height: 5rem;">
  </div>
  <div style="margin-top: 3rem; text-align: center; font-size: 0.75rem;">
    <p>Make all payable checks to ${company_name}.</p>
  </div>
  <div style="margin-top: 3rem; text-align: center; font-size: 0.75rem; color: #6B7280;">
    <p>&copy; 2023 ${company_name}. All rights reserved.</p>
  </div>

</body>
</html>
`