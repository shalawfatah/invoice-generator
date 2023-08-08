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
    <View className="w-screen h-5/6">
      <WebView source={{ uri: item.source }} />
      <View className="m-2">
          <InvoiceBtn text="Choose template" mode="contained" duty={() => navigation.navigate('AddCompany', {item})} />
          <InvoiceBtn text="Back to temlpates" mode="contained" duty={() => navigation.navigate('Templates')} />
      </View>
    </View>
  )
}

export default TemplateView