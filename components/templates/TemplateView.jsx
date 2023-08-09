import React from 'react'
import { View } from 'react-native'
import {WebView} from 'react-native-webview'
import InvoiceBtn from '../general/Button';
import { useNavigation } from '@react-navigation/native';

const TemplateView = ({route}) => {
    const {item} = route.params;
    const navigation = useNavigation();
    console.log('item ', item)
  return (
    <View className="w-screen min-h-[650px] relative">
      <WebView source={{ uri: item.url }} />
      <View className="m-2">
        <View className="my-2">
          <InvoiceBtn text="Choose this template" mode="contained" duty={() => navigation.navigate('AddCompany', {item})} />
        </View>
        <View className="my-2">
          <InvoiceBtn text="Back to temlpates" mode="contained" duty={() => navigation.navigate('Templates')} />
        </View>
      </View>
    </View>
  )
}

export default TemplateView