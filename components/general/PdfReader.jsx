import React from 'react'
import {View} from 'react-native';
import { WebView } from 'react-native-webview'

const PdfReader = ({url, classes}) => {
  return (
    <View className={`${classes}`}>
        <WebView source={{ uri: url }} />
    </View>
  )
}

export default PdfReader