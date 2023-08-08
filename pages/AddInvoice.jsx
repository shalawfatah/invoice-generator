import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native'
import { calc_amount, gst } from '../util_functions/calc_amount';
import Border from '../components/general/Border';

const companies = [
  {id: 1, company: 'F&D'},
  {id: 2, company: 'Google Construction'},
  {id: 3, company: 'Yahoo Painting'},
  {id: 4, company: 'Pepsi'},
  {id: 5, company: 'Cola'},
  {id: 6, company: 'Hisense'},
]
const AddInvoice = () => {
  const [chosen, setChosen] = useState(null)
  const [text, setText] = useState('')
  const filtered_companies = companies.filter(item => item.company.includes(text));
  const navigation = useNavigation()

  // temporary
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState(0)

  const tax = gst([amount])
  const total = calc_amount([amount])

  return (
    <ScrollView className="p-2 bg-white">
      <TextInput
          label="Company"
          value={text}
          placeholder='Type company name to send invoice to'
          onChangeText={text => setText(text)}
          backgroundColor="#FFFFFF"
        />
        {filtered_companies.length === 0 ? 
        <Text className="m-4 text-lg font-bold">This company is not registered. Please add it.</Text> 
        : <Picker
            selectedValue={chosen}
            style={{ height: "auto", width: "auto" }}
            onValueChange={(chosen, index) => setChosen(chosen)}
          >
      {filtered_companies.map(item => {
        return <Picker.Item key={item.id} label={item.company} value={item.id} />
      })}
      </Picker>}
      <InvoiceBtn 
        duty={() => navigation.navigate('AddCompany')} 
        icon="plus" 
        mode="contained" 
        text="Add Company" /> 
      <TextInput
          label="Task description"
          placeholder='What task did you perform?'
          onChangeText={desc => setDesc(desc)}
          backgroundColor="#FFFFFF"
        />
      <TextInput
          label="Task amount"
          placeholder='How much did it cost?'
          onChangeText={amount => setAmount(amount)}
          backgroundColor="#FFFFFF"
        />
        <View className="my-4">
        <InvoiceBtn 
          duty={() => console.log('add task')} 
          icon="plus" 
          mode="contained" 
          text="Add Another Task" 
          /> 
        </View>
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Tax</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">{tax}</Text>
        </View>
        <Border />
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Total</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 font-bold min-w-[150px] text-center">{total}</Text>
        </View>
        <InvoiceBtn 
          duty={() => navigation.navigate('PreviewInvoice')} 
          icon="plus" 
          mode="contained" 
          text="Save" /> 
    </ScrollView>
  )
}

export default AddInvoice