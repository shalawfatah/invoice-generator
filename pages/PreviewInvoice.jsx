import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Classic from '../components/templates/invoice_templates/Classic'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { classic_template } from '../components/templates/invoice_templates/classic'
import InvoiceBtn from '../components/general/Button'

const PreviewInvoice = ({route}) => {
  const {tasks, tax, subtotal, total, chosen} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const client = JSON.parse(chosen);


    const generatePDF = async () => {
      const file = await Print.printToFileAsync({
        html: classic_template("Vancrown Home", "123 something", "some@some.com", "https://vancrown.ca/wp-content/uploads/2022/06/cropped-logo.webp",
          client.client_name, client.client_address, client.client_email,
          tasks, subtotal, tax, total),
          base64:false,
      })
      setPdf(file.uri);
    };
    

  return (
    <View>
    <ScrollView>
      <Classic 
        company_name="van"
        company_address="456"
        company_email="aaa"
        company_logo="https://www.w3schools.com/css/paris.jpg"
        client_name={client.company_name}
        client_address={client.company_address}
        client_email={client.company_email}
        tasks={tasks} 
        subtotal={subtotal}
        tax={tax} 
        total={total} />
    </ScrollView>
    <View className="m-2">
      <InvoiceBtn text="Edit Invoice" classes="my-2" duty={() => navigation.navigate('Add Invoice')} />
      <InvoiceBtn text="Send Invoice" classes="my-2 " buttonColor='#dc143c' textColor='#FFF' />
    </View>
    </View>
  )
}

export default PreviewInvoice