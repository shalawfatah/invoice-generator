import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert , Text} from 'react-native'
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
          type: 'estimate'
        },
      ])
      .select()
      if(error) {
        console.log(error)
      } else {
        console.log(data)
      }
    const name = profile.name
    const file = await Print.printToFileAsync({
      html: temp,
        base64:false,
    })
    const contentUri = await FileSystem.getContentUriAsync(file.uri);
      if(profile !== null) {
        Mailer.mail({
          subject: `${name}. ${dox}`,
          recipients: [client.company_email],
          ccRecipients: ["shalaw.fatah@gmail.com"],
          bccRecipients: ['shalaw.fatah@yahoo.com'],
          body: `This is an ${dox}`,
          isHTML: true,
          attachment: {
            path: `${contentUri}`,  // The absolute path of the file from which to read data.
            type: 'pdf',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            name: `${name}_${dox}_${new Date()}`,   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        });
            // await MailComposer.composeAsync({
            //   Subject: `${name}. ${dox}`,
            //   body: `This is an ${dox}`,
            //   recipients: [client.company_email, "shalaw.fatah@gmail.com"],
            //   bccRecipients: [profile.email],
            //   attachments: [contentUri]
            // }).then((res) => setLoading(false)).catch((error) => Alert.alert(error.message))
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
       {isAvailable ? <InvoiceBtn 
        text="Send Invoice" 
        icon="rocket"
        classes="my-2 " 
        buttonColor='#dc143c' 
        textColor='#FFF'
        loading={loading}
        duty={generatePDF}
        /> : <Text className="my-6 text-center">Please install defaul Mail app to send this invoice</Text>}
    </View>
    </View>
  )
}

export default PreviewInvoice