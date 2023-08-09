import { View, Text, FlatList, ScrollView, Button } from 'react-native'
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

  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(1);

  const addTask = () => {
    const newTask = {
      id: counter,
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const updateTask = (id, field, value) => {
        setTasks((prevTasks) =>
        prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      ));
    };
  
    const amount = Array.from(tasks.map(x => Number(x.number)))
    console.log('am ', tasks)

  const tax = gst(amount)
  const total = calc_amount(amount)

  console.log('t ', tasks)
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
      {filtered_companies.length > 0 ? <View></View> :
      <InvoiceBtn 
        duty={() => navigation.navigate('AddCompany')} 
        icon="plus" 
        mode="contained" 
        text="Add Company" /> 
      }
    <View>
      <View>
        {tasks.map((task) => (
          <View key={task.id}>
            <TextInput
              style={{  }}
              label="Task description"
              value={task.text}
              onChangeText={(text) => updateTask(task.id, 'text', text)}
              backgroundColor="white"
            />
            <TextInput
              style={{ }}
              label="Task amount"
              value={task.number}
              onChangeText={(number) => updateTask(task.id, 'number', number)}
              keyboardType="numeric"
              backgroundColor="white"
            />
          </View>
        ))}
      </View>
      <View className="my-2">
        <InvoiceBtn icon="plus" mode="contained" text={tasks.length > 0 ? 'Add another task' : 'Add a task'} duty={addTask} />
      </View>
    </View>
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Tax</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">{isNaN(tax) ? null : tax}</Text>
        </View>
        <Border />
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Total</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 font-bold min-w-[150px] text-center">{isNaN(total) ? null : total}</Text>
        </View>
        <InvoiceBtn 
          duty={() => navigation.navigate('PreviewInvoice')} 
          icon="plus" 
          mode="contained" 
          text="Save" /> 
          <View className="my-12"></View>
    </ScrollView>
  )
}

export default AddInvoice