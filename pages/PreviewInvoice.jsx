import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Classic from '../components/templates/invoice_templates/classic/classic'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { classic_template } from '../components/templates/invoice_templates/classic/classic'
import InvoiceBtn from '../components/general/Button'
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import { SessionContext } from '../App'

const PreviewInvoice = ({route}) => {
  const {email, id, user_metadata: {avatar, address, company}} = useContext(SessionContext);
  const {tasks, tax, subtotal, total, chosen, note} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(chosen)
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability()
  })
  useEffect(() => {
    setClient(JSON.parse(chosen))
  }, [])


    const generatePDF = async () => {
      // SAVE THE DATA FIRST
        const { data, error } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: id,
            company_id: client?.id,
            subtotal: subtotal,
            total: total,
            subtotal: subtotal,
            tax_amount: tax,
            tasks: tasks
          },
        ])
        .select()
        if(error) {
          console.log(error)
        } else {
          console.log(data)
        }

      const file = await Print.printToFileAsync({
        html: classic_template(company, address, email, avatar,
          client?.client_name, client?.client_address, client?.client_email,
          tasks, subtotal, tax, total, note),
          base64:false,
      })
      const contentUri = await FileSystem.getContentUriAsync(file.uri);
        MailComposer.composeAsync({
          Subject: "Vancrown Home Services Inc. Invoice",
          body: "This is an invoice",
          recipients: "shalaw.fatah@gmail.com",
          attachments: [contentUri]
        })
    };
    

  return (
    <View>
    <ScrollView>
      <Classic 
        company_name={company}
        company_address={address}
        company_email={email}
        company_logo={avatar}
        client_name={client.company_name}
        client_address={client.company_address}
        client_email={client.company_email}
        tasks={tasks} 
        subtotal={subtotal}
        tax={tax} 
        total={total}
        note={note}
        />
    </ScrollView>
    <View className="m-2">
      <InvoiceBtn 
        text="Edit Invoice" 
        classes="my-2" 
        duty={() => navigation.navigate('Add Invoice')} 
        />
      <InvoiceBtn 
        text="Send Invoice" 
        classes="my-2 " 
        buttonColor='#dc143c' 
        textColor='#FFF'
        duty={generatePDF}
        />
    </View>
    </View>
  )
}

export default PreviewInvoice