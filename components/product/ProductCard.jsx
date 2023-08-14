import { View, Text } from 'react-native'
import React from 'react'
import InvoiceBtn from '../general/Button'

const ProductCard = ({name, price, subscribe}) => {
  return (
    <View className="bg-white p-4 m-4 shadow-sm">
      <Text className="font-bold text-lg my-2">{name}</Text>
      <Text className="text-md my-2">Price: {price} per month</Text>
      <InvoiceBtn text="Subscribe" duty={subscribe} classes="my-2" />
    </View>
  )
}

export default ProductCard