import { View, Text } from 'react-native'
import React from 'react'
import Border from '../components/general/Border';

const SingleInvoice = ({route}) => {
  const {item} = route.params;
  return (
    <View className="p-4">
        <Text className="font-bold text-lg">To: {item.companies.company_name}</Text>
        <Text className="text-gray-500">On: {item.created_at}</Text>
        <Text className="font-bold text-lg bg-indigo-100">Tasks</Text>
        <Border />
        <View>
        {item.tasks.map(x => {
          return <View className="flex flex-row items-center justify-between" key={x.id}>
            <Text className="text-md">{x.text}</Text>
            <Text className="text-md">${x.number}</Text>
          </View>
        })}
      </View>
      <Border />
        <Text className="font-bold text-md">Subtotal: ${item.subtotal}</Text>
      <Border />
        <Text className="font-bold text-md">Tax: ${item.tax_amount}</Text>
      <Border />
        <Text className="font-bold text-lg">Total: ${item.total}</Text>
        <Border />
    </View>
  )
}

export default SingleInvoice