import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert , Platform, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import InvoiceBtn from '../components/general/Button'
import * as FileSystem from 'expo-file-system';
import TemplateRenderer from '../components/templates/TemplateRenderer.jsx'
import { template_choice } from '../components/templates/template_choice.js'
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import Purchases from 'react-native-purchases';
import { invoiceTriggerAtom } from '../lib/store';
import { useAtom } from 'jotai';

const PreviewInvoice = ({route}) => {
  const {tasks, tax, subtotal, total, choice, note, user, profile, number} = route.params;
  const navigation = useNavigation();
  const [client, setClient] = useState(choice)
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false);
  const [temp, setTemp] = useState(null)
  const parsed_number = parseInt(number)
  const [invoiceTrigger, setInvoiceTrigger] = useAtom(invoiceTriggerAtom)

  const dox = "Invoice";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if Sharing is available
        const sharingAvailable = await Sharing.isAvailableAsync();
        setSharing(sharingAvailable);
        if (tasks !== undefined) {
          setTemp(template_choice(profile, client, tasks, subtotal, tax, total, note, dox, profile.template));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [active, setActive] = useState([]);
  const check_subscription = async() => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setActive(customerInfo.activeSubscriptions)
    } catch (e) {
     console.log(e)
    }
  }

  useEffect(() => {
    check_subscription()
  }, [])

  const generatePDF = async () => {
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
          type: 'invoice',
          document_number: parsed_number
        },
      ])
      .select()
      if(error) {
        Alert.alert(error.message)
        setLoading(false)
      } else {
        setInvoiceTrigger(prev => !prev)
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
        receipents: [`${choice.company_email}`],
        attachments: [contentUriAndroid]
      }
      MailComposer.composeAsync(options).catch(error => Alert.alert(error))
    } else {
      Sharing.shareAsync(contentUri, {
        mimeType: 'application/pdf',
        UTI: 'pdf'
      }).then((e) => console.log(e)).catch((error) => console.log(error.message))
    }
  } else {
    Alert.alert('Sharing is not available')
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
        document_number={number}
        />}
    </ScrollView>
    <View className="m-2">
    <InvoiceBtn 
          text="Edit Invoice" 
          icon="pencil-outline"
          classes="my-2" 
          duty={() => navigation.navigate('Add Invoice')} 
        />
    {active.length !== 0 ? 
    <InvoiceBtn 
          text="Share Estimate" 
          icon="rocket"
          classes="my-2 " 
          buttonColor='#dc143c' 
          textColor='#FFF'
          duty={generatePDF}
        /> :
        <View>
          <Text className="text-center font-bold my-4">To share your document, please subscribe</Text>
      <InvoiceBtn 
          text="Subscribe" 
          icon="rocket"
          classes="my-2 " 
          buttonColor='#dc143c' 
          textColor='#FFF'
          duty={() => navigation.navigate('Subscribe Packages', { customer })}
        />
        </View>
        }
    </View>
    </View>
  )
}

export default PreviewInvoice