import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const InvoiceItem = ({link, company, date, total}) => {
  return (
    <TouchableOpacity onPress={link}>
        <View className="flex flex-row justify-between items-start p-2 bg-white shadow-sm shadow-gray-400 my-1 rounded-md px-4">
            <View>
                <Text className="font-bold text-lg">{company}</Text>
                <Text className="text-gray-400 text-xs">{date}</Text>
            </View>
            <View className="bg-yellow-200 px-2 py-[2px] rounded-md">
                <Text className="font-bold text-md text-black">${total}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default InvoiceItem