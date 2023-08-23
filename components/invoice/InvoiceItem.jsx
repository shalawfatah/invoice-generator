import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const InvoiceItem = ({link, company, date, total}) => {
  return (
    <TouchableOpacity onPress={link}>
        <View className="flex flex-row justify-between p-2 bg-white shadow-sm my-1 rounded-md px-4">
            <View>
                <Text className="font-bold text-md">{company}</Text>
                <Text className="text-gray-500 text-xs">{date}</Text>
            </View>
            <View>
                <Text className="font-bold text-md">${total}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default InvoiceItem