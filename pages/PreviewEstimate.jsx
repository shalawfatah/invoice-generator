import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Classic from '../components/templates/invoice_templates/classic/Classic.jsx'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import { classic_template } from '../components/templates/invoice_templates/classic/classic.js'
import InvoiceBtn from '../components/general/Button'
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import { SessionContext } from '../App'

const PreviewEstimate = ({route}) => {
  const {tasks, tax, subtotal, total, chosen, note, user} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(chosen)
  const [isAvailable, setIsAvailable] = useState(false)
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

  const dox = "Estimate"
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


    const generatePDF = async () => {
      // SAVE THE DATA FIRST
        const { data, error } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: profile.user_id,
            company_id: client.id,
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
        html: classic_template(name, profile.address, profile.email, profile.avatar,
          client?.client_name, client?.client_address, client?.client_email,
          tasks, subtotal, tax, total, note),
          base64:false,
      })
      const contentUri = await FileSystem.getContentUriAsync(file.uri);
        MailComposer.composeAsync({
          Subject: `${name}. ${dox}"`,
          body: `This is an ${dox}`,
          recipients: "shalaw.fatah@gmail.com",
          attachments: [contentUri]
        })
    };
    

  return (
    <View>
    <ScrollView>
      {profile !== null && <Classic 
        company_name={profile.name}
        company_address={profile.address}
        company_email={profile.email}
        company_logo={profile.avatar}
        client_name={client.company_name}
        client_address={client.company_address}
        client_email={client.company_email}
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
        text="Send Estimate" 
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