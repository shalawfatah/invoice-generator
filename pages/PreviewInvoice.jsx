import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import {WebView} from 'react-native-webview'
import InvoiceBtn from '../components/general/Button'
import { useNavigation } from '@react-navigation/native'

const PreviewInvoice = () => {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <Text className="text-2xl text-center mx-4 my-2 font-bold text-[#4847A0]">Do you want to send this invoice</Text>
      <Text className="text-gray-400 mx-4 text-center">Tap and Pinch to zoom the invoice</Text>
    <View className="w-screen h-[500px]">
      <WebView source={{ uri: "https://www.africau.edu/images/default/sample.pdf" }} />
      <View className="m-2">
        <View className="my-2">
          <InvoiceBtn text="Send" mode="contained" textColor='#FFF' buttonColor='#FF876C' duty={() => navigation.navigate('ConfirmSent')} />
        </View>
        <View className="my-2">
          <InvoiceBtn text="Back to invoice" mode="contained" duty={() => navigation.navigate('AddInvoice')} />
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

export default PreviewInvoice