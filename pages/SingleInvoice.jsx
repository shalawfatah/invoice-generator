import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Border from '../components/general/Border';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { invoiceTriggerAtom } from '../lib/store';

const SingleInvoice = ({route}) => {
  const {item} = route.params;
  const time = format(new Date(item.created_at), "dd MMMM yyyy 'at' HH:mm ")
  const navigation = useNavigation();
  const [type, setType] = useState('invoice')
  const [invoiceTrigger, setInvoiceTrigger] = useAtom(invoiceTriggerAtom)

  useEffect(() => {
    setType(item.type)
  }, [])

  const delete_invoice = async() => {
      const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', item.id)
      if(error) {
        console.log(error)
      } else {
        setInvoiceTrigger(prev => !prev)
        type === 'invoice' ? navigation.navigate('Archive') : navigation.navigate('EstimateArchive')
      }
  }

  const arrayCheck = Array.isArray(item.tasks)

  return (
    <View className="p-4">
        <Text className="font-bold text-lg">To: {item.companies.company_name}</Text>
        <Text className="text-gray-500">On: {time}</Text>
        <Text className="font-bold text-lg bg-indigo-100">Tasks</Text>
        <Border />
        <View>
          {arrayCheck ? <View>
        {item.tasks.map((x, index) => {
          return <View className="flex flex-row items-center justify-between" key={index}>
            <Text className="text-md">{x.text}</Text>
            <Text className="text-md">${x.amount}</Text>
          </View>
        })}</View> : <View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-md">{item?.tasks?.text}</Text>
            <Text className="text-md">${item?.tasks?.amount}</Text>
          </View>
        </View>}
      </View>
      <Border />
        <Text className="font-bold text-md">Subtotal: ${item.subtotal}</Text>
      <Border />
        <Text className="font-bold text-md">Tax: ${item.tax_amount}</Text>
      <Border />
        <Text className="font-bold text-lg">Total: ${item.total}</Text>
        <Border />
        <TouchableOpacity onPress={delete_invoice} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-2">
          <Text className="mx-2 font-bold text-white">Delete</Text>
          <Ionicons name="trash-outline" color={"white"} size={20} />
        </TouchableOpacity>
    </View>
  )
}

export default SingleInvoice