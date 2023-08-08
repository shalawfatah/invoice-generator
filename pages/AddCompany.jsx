import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import InvoiceInput from '../components/company/InvoiceInput'
import InvoiceBtn from '../components/general/Button'

const AddCompany = () => {
  
    const navigation = useNavigation()
  
    return (
      <View className="flex justify-center items-center w-screen p-4 bg-white">
          <InvoiceInput 
              mode="outlined" 
              label="Company Name"
              placeholder="Write your company's name..." 
              />
          <InvoiceInput 
              mode="outlined" 
              label="Company Email"
              placeholder="Write the company's email..." 
              />
          <InvoiceInput 
              mode="outlined" 
              label="Company Address"
              placeholder="Write the company's address..." 
              />
          <View className="my-8 w-full">
            <InvoiceBtn text="Register" mode="contained" duty={() => navigation.navigate('AddInvoice')}/>
          </View>
      </View>
    )
}

export default AddCompany