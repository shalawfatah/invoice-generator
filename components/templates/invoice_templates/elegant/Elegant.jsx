import React from 'react'
import {WebView} from 'react-native-webview';

const Elegant = ({
    company_name, company_address, company_email, company_logo, 
    client_name, client_address, client_email, 
    tasks, subtotal, tax, total, note, dox, document_number
                }) => {
    const htmlContent = `<html lang="en">
    
    <body style="padding: 2rem;">
    
    <p style="font-size: 1.25rem; font-weight: bold; margin: 0;">${dox} Number: ${document_number}</p>
      <div style="display: flex; align-items: center; margin-bottom: 3rem;">
        <img src=${company_logo} alt="Company Logo" style="height: 4rem; margin-right: 1rem;">
    
        <div>
          <h1 style="font-size: 1.25rem; font-weight: bold;">${company_name}</h1>
          <p>${company_address}</p>
          <p>${company_email}</p>
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
          <tr style="background-color: #E2E8F0;">
            <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Task</th>
            <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Amount</th>
          </tr>
        </thead>
        <tbody>
        ${tasks.map(item => {
            return `<tr>
                <td style="padding: 0.5rem 1rem; border: 1px solid black;">${item.text}</td>
                <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${item.number} ${item.quantity > 1 ? (`<span style="color:gray;margin-left:4px; margin-right:4px; font-size:10px;"> (x${item.quantity})</span>`) : ''} ${item.tax === true ? (`<span style="background-color:lightgray; color: white;margin-left:4px; margin-right:4px; padding:4px; border-radius:4px;font-size:10px;"> GST $${((item.number * item.quantity) * 0.05).toFixed(2)}</span>`) : ''}</td>
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
    
      <div style="margin-top: 3rem; text-align: center; font-size: 0.875rem; color: #A0AEC0;">
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

export default Elegant