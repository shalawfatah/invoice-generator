import React from 'react'
import { View } from 'react-native'
import InvoiceBtn from '../general/Button';
import InvoiceInput from './InvoiceInput';

const CompanyForm = () => {
  return (
    <View className="flex justify-center items-center w-screen p-4">
        <InvoiceInput 
            mode="outlined" 
            label="Company Name"
            placeholder="Write your company's name..." 
            />
        <InvoiceInput 
            mode="outlined" 
            label="Company Email"
            placeholder="Write your company's email..." 
            />
        <InvoiceInput 
            mode="outlined" 
            label="Company Address"
            placeholder="Write your company's address..." 
            />
          <InvoiceInput 
            mode="outlined" 
            label="Company Logo"
            placeholder="Write your company's logo..." 
            />
        <View className="my-8 w-full">
          <InvoiceBtn mode="contained" duty={() => console.log('name')}/>
        </View>
    </View>
  )
}

export default CompanyForm