import { View, Text } from 'react-native'
import React from 'react'

const ConfirmSent = () => {
  return (
    <View className="flex h-screen w-screen justify-center items-center">
      <Text>Invoice sent...</Text>
      <Text>Check your email for confirmation</Text>
    </View>
  )
}

export default ConfirmSent