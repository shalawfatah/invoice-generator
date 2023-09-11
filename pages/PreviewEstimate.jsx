import React, { useEffect, useState } from 'react'
import { View, ScrollView, Platform, Alert, Linking } from 'react-native'
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
  const {tasks, tax, subtotal, total, choice, note, user, profile, number} = route.params;
  const navigation = useNavigation();
  const [client, setClient] = useState(choice)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [temp, setTemp] = useState(null)
  const [sharing, setSharing] = useState(false);
  const API_URL = "https://manage-invoice-generator.netlify.app";

  const dataToSend = { stripeId: profile.stripe_customer_id };
  const queryString = Object.keys(dataToSend)
    .map((key) => key + '=' + dataToSend[key])
    .join('&');
  const dox = "Estimate";
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Check if Sharing is available
        const sharingAvailable = await Sharing.isAvailableAsync();
        setSharing(sharingAvailable);

        // Check if MailComposer is available
        const mailAvailable = await MailComposer.isAvailableAsync();
        setIsAvailable(mailAvailable);

        if (tasks !== undefined) {
          setTemp(template_choice(profile, client, tasks, subtotal, tax, total, note, dox, profile.template));
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [active, setActive] = useState(null);
  const [customer, setCustomer] = useState(null)
  useEffect(() => {
    setActive(profile.subscription_status)
    setCustomer(profile.stripe_customer_id)
  }, [profile])

    const generatePDF = async () => {
      setLoading(true)
      if(active !== 'active') {
        if (Platform.OS === 'ios') {
          await Linking.openURL(`${API_URL}?${queryString}`)
        } else {
          await navigation.navigate('Subscribe Packages', { customer });
        }
      } else {
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

        const file = await Print.printToFileAsync({
        html: temp,
          base64:false,
      })
      const contentUri = await FileSystem.getContentUriAsync(file.uri);
      const parts = contentUri.split('/')
      let assetName = parts[parts.length - 1];
      const contentUriAndroid = `${FileSystem.documentDirectory}/${assetName}`;
      await FileSystem.copyAsync({
        from: file.uri,
        to: contentUriAndroid,
      });

    if(sharing) {
    if(Platform.OS === 'android') {
      const options = {
        subject: `Invoice from ${profile.name}`,
        body: `Invoice from ${profile.name} to ${client.company_name} where total is ${total}`,
        receipents: [client.company_email, profile.email],
        attachments: [contentUriAndroid]
      }
      MailComposer.composeAsync(options).catch(error => Alert.alert(error))
      // Sharing.shareAsync(contentUriAndroid, {
      //   mimeType: 'application/pdf',
      //   UTI: 'pdf'
      // }).then((e) => console.log(e)).catch((error) => console.log(error.message))
    } else {
      Sharing.shareAsync(contentUri, {
        mimeType: 'application/pdf',
        UTI: 'pdf'
      }).then((e) => console.log(e)).catch((error) => Alert.alert(error.message))
    }
    } else {
      Alert.alert('Sharing is not available')
    }
    setLoading(false)
      }
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
        document_number={number}
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