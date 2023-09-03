import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert , Text, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import * as Print from 'expo-print';
import InvoiceBtn from '../components/general/Button'
import * as FileSystem from 'expo-file-system';
import TemplateRenderer from '../components/templates/TemplateRenderer.jsx'
import { template_choice } from '../components/templates/template_choice.js'
import * as Sharing from 'expo-sharing';

const PreviewInvoice = ({route}) => {
  const {tasks, tax, subtotal, total, choice, note, user, profile, number} = route.params;
  const navigation = useNavigation();
  const [pdf, setPdf] = useState(null);
  const [client, setClient] = useState(choice)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false);
  const isSharingAvilable = () => Sharing.isAvailableAsync().then((res) => setSharing(res)).catch(e => console.log(e))

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if Sharing is available
        const sharingAvailable = await Sharing.isAvailableAsync();
        setSharing(sharingAvailable);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
          type: 'invoice'
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
      if(Platform.OS === 'android') {
        const tempUri = await FileSystem.cacheDirectory + file.uri;
        await Sharing.shareAsync(tempUri)

        console.log('hi')
      } else {
        await Sharing.shareAsync(contentUri)
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
      <InvoiceBtn 
        text="Share Invoice" 
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