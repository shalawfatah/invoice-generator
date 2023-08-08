import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native'

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
  return (
    <View className="p-2 bg-white">
      <TextInput
          label="Company"
          value={text}
          placeholder='Type company name to send invoice to'
          onChangeText={text => setText(text)}
          backgroundColor="#FFFFFF"
        />
      <Picker
            selectedValue={chosen}
            style={{ height: "auto", width: "auto" }}
            onValueChange={(chosen, index) => setChosen(chosen)}
          >

      {filtered_companies.map(item => {
        return <Picker.Item key={item.id} label={item.company} value={item.id} />
      })}
      </Picker>
      <InvoiceBtn 
        duty={() => navigation.navigate('AddCompany')} 
        icon="plus" 
        mode="contained" 
        text="Add Company" />
    </View>
  )
}

export default AddInvoice