import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import InvoiceBtn from '../general/Button'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checking = () => {
    const navigation = useNavigation()
  return (
    <View className="my-8 mx-4">
        <Text className="font-bold text-md text-center my-2">Please register your company and subscribe to use invoices</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Company Register')} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-2">
          <Text className="mx-2 font-bold text-black">Register Company</Text>
          <Ionicons name="person-circle-outline" color={"black"} size={20} />
        </TouchableOpacity>
    </View>
  )
}

export default Checking