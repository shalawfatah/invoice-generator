import React from 'react'
import { View } from 'react-native'
import {WebView} from 'react-native-webview'
import InvoiceBtn from '../general/Button';
import { useNavigation } from '@react-navigation/native';

const TemplateView = ({route}) => {
    const {item} = route.params;
    const navigation = useNavigation();
  return (
    <View className="w-screen min-h-[650px] relative">
      <WebView source={{ uri: item.url }} />
      <View className="m-2">
        <View className="my-2">
          <InvoiceBtn  icon="document-outline" text="Choose this template" mode="contained" duty={() => navigation.navigate('AddInvoice', {item})} />
        </View>
        <View className="my-2">
          <InvoiceBtn icon="newspaper-outline" text="Back to temlpates" mode="contained" duty={() => navigation.navigate('Templates')} />
        </View>
      </View>
    </View>
  )
}

export default TemplateView