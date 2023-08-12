import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const InvoiceItem = ({link, company, date, total}) => {
  return (
    <TouchableOpacity onPress={link}>
        <View className="flex flex-row items-center justify-between my-1 bg-gray-100 border-gray-200 p-2">
            <View>
                <Text className="font-bold text-lg">{company}</Text>
                <Text className="text-gray-500">{date}</Text>
            </View>
            <View>
                <Text className="font-bold text-lg">${total}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default InvoiceItem