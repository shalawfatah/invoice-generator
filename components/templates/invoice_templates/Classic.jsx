import React from 'react'
import { View, Text, Image } from 'react-native'
import {WebView} from 'react-native-webview';

const Classic = () => {
    const htmlContent = `
    <div style="display:flex; justify-content:center;">
            <div style="padding: 10px; width: 592px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3.5rem;">
                <div style="text-align: left;">
                    <h1 style="font-size: 1.25rem; font-weight: bold;">Your Company Name</h1>
                    <p>123 Company Street, City</p>
                    <p>Country, Postal Code</p>
                </div>
                <div style="text-align: right;">
                    <img src="https://vancrown.ca/wp-content/uploads/2022/06/cropped-logo.webp" alt="Company Logo" style="height: 4rem;">
                </div>
            </div>

            <div style="margin-bottom: 3.5rem;">
                <h2 style="font-size: 1rem; font-weight: bold; margin-bottom: 0.5rem;">Bill To:</h2>
                <p>Client Company Name</p>
                <p>456 Client Street, City</p>
                <p>Country, Postal Code</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; border: 1px solid silver; margin-bottom:3.5rem;">
                <thead>
                    <tr style="background-color: #D3D3D3;">
                        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Task</th>
                        <th style="padding: 0.5rem 1rem; border: 1px solid black; text-align: left;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 0.5rem 1rem; border: 1px solid black;">Task 1</td>
                        <td style="padding: 0.5rem 1rem; border: 1px solid black;">$100</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 1rem; border: 1px solid black;">Task 2</td>
                        <td style="padding: 0.5rem 1rem; border: 1px solid black;">$150</td>
                    </tr>
                    <!-- Add more rows as needed -->
                </tbody>
            </table>

            <div style="margin-top: 3.5rem; text-align: right;">
                <p style="margin-bottom: 0.5rem;">Subtotal: $250</p>
                <p style="margin-bottom: 0.5rem;">Tax (10%): $25</p>
                <p style="font-weight: bold;">Total: $275</p>
            </div>

            <div style="margin-top: 3rem; text-align: center; font-size: 0.875rem; color: #A1A1A1;">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
        </div>
        </div>

    `;
  return (
        <WebView 
            source={{html: htmlContent}}
            className="w-screen min-h-[400px]"
            />
  )
}

export default Classic