import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import InvoiceBtn from '../components/general/Button'
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import TemplateRenderer from '../components/templates/TemplateRenderer.jsx'
import { template_choice } from '../components/templates/template_choice.js'

const PreviewInvoice = ({route}) => {
  const {tasks, tax, subtotal, total, choice, note, user, profile} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(choice)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loading, setLoading] = useState(false)

  const dox = "Invoice"
  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability()
  })

  const [temp, setTemp] = useState(null)

  useEffect(() => { 
    if(tasks !== undefined) {
      setTemp(template_choice(profile, client, tasks, subtotal, tax, total, note, profile.template))
    }
  }, [])

  const generatePDF = async () => {
      // SAVE THE DATA FIRST
      setLoading(true)
        const { data, error } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: profile.user_id,
            company_id: client?.id,
            subtotal: subtotal,
            total: total,
            subtotal: subtotal,
            tax_amount: tax,
            tasks: tasks,
            type: 'invoice'
          },
        ])
        .select()
        if(error) {
          console.log(error)
        } else {
          console.log(data)
        }
      const name = profile.name || 'default_name';
      const file = await Print.printToFileAsync({
        html: temp,
          base64:false,
      })
      const contentUri = await FileSystem.getContentUriAsync(file.uri);
      if(profile !== null) {
          await MailComposer.composeAsync({
            Subject: `${name}. ${dox}"`,
            body: `This is an ${dox}`,
            recipients: ["shalaw.fatah@gmail.com"],
            bccRecipients: [profile.email],
            attachments: [contentUri]
          }).then((res) => setLoading(false)).catch((error) => Alert.alert(error.message))
      } else {
        return;
      }
      setLoading(false)
    };
    

  return (
    <View>
    <ScrollView>
      {profile !== null && <TemplateRenderer 
        template_id={profile.template} 
        profile={profile} 
        client={client}
        tasks={tasks}
        subtotal={subtotal}
        tax={tax}
        total={total}
        note={note}
        dox={dox} 
        />}
    </ScrollView>
    <View className="m-2">
      <InvoiceBtn 
        text="Edit Invoice" 
        icon="pencil-outline"
        classes="my-2" 
        duty={() => navigation.navigate('Add Invoice')} 
        />
       <InvoiceBtn 
        text="Send Invoice" 
        icon="rocket"
        classes="my-2 " 
        buttonColor='#dc143c' 
        textColor='#FFF'
        loading={loading}
        duty={generatePDF}
        />
    </View>
    </View>
  )
}

export default PreviewInvoice