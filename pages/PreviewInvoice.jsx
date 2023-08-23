import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import InvoiceBtn from '../components/general/Button'
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import TemplateRenderer from '../components/templates/TemplateRenderer.jsx'
import { template_choice } from '../components/templates/template_choice.js'

const PreviewInvoice = ({route}) => {
  const {tasks, tax, subtotal, total, chosen, note, user} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(chosen)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const fetch_profile = async() => {
    const {data, error} = await supabase.from('profile').select().eq('email', user.email).single();
    if(error) {
      console.log(error)
    } else {
      setProfile(data)
    }
  }
  useEffect(() => { fetch_profile() }, [user])

  const dox = "Invoice"
  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability()
  })
  useEffect(() => {
    setClient(JSON.parse(chosen))
  }, [route])

  const [temp, setTemp] = useState(null)
  useEffect(() => { 
    if(profile !== null) {
      setTemp(template_choice(profile?.name, profile, client, tasks, subtotal, tax, total, note ))
    }
  }, [user])

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
      profile !== null && (
        await MailComposer.composeAsync({
          Subject: `${name}. ${dox}"`,
          body: `This is an ${dox}`,
          recipients: ["shalaw.fatah@gmail.com"],
          bccRecipients: [profile.email],
          attachments: [contentUri]
        })
      );
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
        /> : <View className="p-2">
                <Text className="text-center text-md my-2">Mail service is not available</Text>
              </View>}
    </View>
    </View>
  )
}

export default PreviewInvoice