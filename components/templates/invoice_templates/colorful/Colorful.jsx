import React from 'react'
import {WebView} from 'react-native-webview';

const Colorful = ({
    company_name, company_address, company_email, company_logo, 
    client_name, client_address, client_email, 
    tasks, subtotal, tax, total, note, dox, document_number, gst, phone, signature, website
                }) => {
    const htmlContent = `
<style>
      * { print-color-adjust:exact !important; }
</style>
<html lang="en">
<body style="padding: 1rem;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src=${company_logo} alt="Company Logo" style="height: 4rem;">
    <p style="font-size: 1.8rem; font-weight: bold; margin-left: -6rem;">${dox}</p>
    <p></p>
  </div>
  <div style="display: flex; justify-content: center;">
    <h1 style="font-size: 2rem;">${company_name}</h1>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: .5rem;">
    <div style="text-align: left;">
      <p style="font-size:1.2rem">Address: ${company_address}</p>
    </div>
    <div style="text-align: right;">
      <p>GST: ${gst}</p>
      <p>${dox} Number: ${document_number}</p>
    </div>
  </div>
  <div style="margin-bottom: .5rem;">
    <h2 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem;">Bill To:</h2>
    <p style="font-size:1rem;">${client_name}</p>
    <p style="font-size:1rem;">${client_address}</p>
    <p style="font-size:1rem;">${client_email}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; border: .5px solid black;">
    <thead>
      <tr style="background-color: #A53760;">
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;color:white;">Task</th>
        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;color:white;">Amount</th>
      </tr>
    </thead>
    <tbody>
    ${tasks.map(item => {
        return `<tr>
            <td style="padding: 0.5rem 1rem; border: 1px solid black; white-space: pre-line;">${item.text}</td>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${item.number} ${item.quantity > 1 ? (`<span style="color:black;margin-left:4px; margin-right:4px; font-size:10px;"> (x${item.quantity})</span>`) : ''} ${item.tax === true ? (`<span style="background-color:aqua; color: black;margin-left:4px; margin-right:4px; padding:4px; border-radius:4px;font-size:10px;"> GST $${((item.number * item.quantity) * 0.05).toFixed(2)}</span>`) : ''}</td>
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
    <tr style="background-color: #A53760;">
      <td style="padding: 0.5rem 1rem; border: 1px solid black; font-weight:bold; color:white;">Total</td>
      <td style="padding: 0.5rem 1rem; border: 1px solid black; font-weight:bold; color:white;">$${total}</td>
    </tr>
    </tbody>
  </table>
  <div style="margin-top: 3rem;">
      <p style="text-align: center;">For questions regarding this invoice, please contact ${company_name}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${company_email}</p>
      <p>Website: ${website}</p>
  </div>
  <div style="display: flex; justify-content: end;">
    <div>
      <p style="font-weight:bold;">Service Person Signature</p>
      <img src=${signature} alt="Company Logo" style="height: 4rem;">
    </div>
  </div>
  <div style="display: flex; justify-content: end;">
    <div>
      <p style="font-weight:bold;">Client Signature</p>
    </div>
  </div>
  <div style="text-align: center; font-size: 0.75rem;">
    <p>Make all payable checks to ${company_name}.</p>
  </div>
  <div style="text-align: center; font-size: 0.75rem; color: #6B7280;">
    <p>&copy; 2023 ${company_name}. All rights reserved.</p>
  </div>
</body>
</html>
`;
  return (
        <WebView 
            source={{html: htmlContent}}
            className="w-screen min-h-[400px]"
            />
  )
}

export default Colorful