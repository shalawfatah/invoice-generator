import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { supabase } from '../../lib/supabase';

const Counter = ({title}) => {
    const [number, setNumber] = useState(0)
    const invoice_fetcher = async() => {
        const {data, error} = await supabase.from('invoices').select()
        if(error) {
            console.log(error)
            return
        } else {
            setNumber((data[data.length - 1].document_number).toString())
        }
    }
    useEffect(() => {
        invoice_fetcher()
    }, [])
  return (
    <View className="flex flex-row items-center justify-between my-2 mx-4">
        <View>
            <Text className="font-bold text-md">{title}</Text>
        </View>
        <View className="flex flex-row items-center">
            <TextInput
                value={number}
                placeholder="00"
                onChangeText={number => setNumber(number)}
                backgroundColor="#FFF"
                style={{minWidth: 70, textAlign:'center'}}
                />
        </View>
    </View>
  )
}

export default Counter