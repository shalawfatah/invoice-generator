import React, { useState } from 'react'
import { View } from 'react-native'
import {WebView} from 'react-native-webview'
import InvoiceBtn from '../general/Button';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/store';

const TemplateView = ({route}) => {
    const [user] = useAtom(userAtom)
    const {item} = route.params;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const chooseTemplate = async() => {
      setLoading(true)
      const {data, error} = await supabase.from('profile').update({'template': item.id}).eq('email', user.email)
      if(error) {
        console.log(error)
      } else {
        setLoading(false)
        navigation.navigate('Add Invoice')
      }
    }
  return (
    <View className="w-screen min-h-[650px] relative">
      <WebView source={{ uri: item.url }} />
      <View className="m-2">
        <View className="my-2">
          <InvoiceBtn 
              loading={loading}  
              icon="document-outline" 
              text="Choose this template" 
              mode="contained" 
              duty={chooseTemplate} 
          />
        </View>
        <View className="my-2">
          <InvoiceBtn 
              icon="newspaper-outline" 
              text="Back to temlpates" 
              mode="contained" 
              duty={() => navigation.navigate('Templates')} 
          />
        </View>
      </View>
    </View>
  )
}

export default TemplateView