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
import * as Sharing from 'expo-sharing';

const PreviewEstimate = ({route}) => {
  const {tasks, tax, subtotal, total, choice, note, user, profile} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(choice)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [temp, setTemp] = useState(null)
  const [sharing, setSharing] = useState(false);
  const isSharingAvilable = () => Sharing.isAvailableAsync().then((res) => setSharing(res)).catch(e => console.log(e))

  useEffect(() => {
    isSharingAvilable()
  }, [])
  const dox = "Estimate";
  
  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability()
  })

  useEffect(() => { 
    if(tasks !== undefined) {
      setTemp(template_choice(profile, client, tasks, subtotal, tax, total, note, dox, profile.template))
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
    if(sharing) {
      Sharing.shareAsync(contentUri)
    } else {
      Alert.alert('Sharing is not available')
    }
      // if(profile !== null) {
      //       await MailComposer.composeAsync({
      //         Subject: `${name}. ${dox}`,
      //         body: `This is an ${dox}`,
      //         recipients: [client.company_email, "shalaw.fatah@gmail.com"],
      //         bccRecipients: [profile.email],
      //         attachments: [contentUri]
      //       }).then((res) => setLoading(false)).catch((error) => Alert.alert(error.message))
      //   } else {
      //     return;
      //   }
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
        text="Edit Estimate" 
        icon="pencil-outline"
        classes="my-2" 
        duty={() => navigation.navigate('Add Estimate')} 
        />
    <InvoiceBtn 
        text="Share Estimate" 
        icon="rocket"
        classes="my-2 " 
        buttonColor='#dc143c' 
        textColor='#FFF'
        duty={generatePDF}
        />
    </View>
    </View>
  )
}

export default PreviewEstimate