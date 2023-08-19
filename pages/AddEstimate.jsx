import { View, Text, FlatList, ScrollView, Button, TouchableOpacity, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { TextInput, Checkbox } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native'
import { calc_amount, gst, subtotal_calc } from '../util_functions/calc_amount';
import Border from '../components/general/Border';
import { supabase } from '../lib/supabase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SessionContext } from '../App';
import Checking from '../components/account/Checking';

const AddEstimate = () => {
  const user = useContext(SessionContext)
  const [stripeId, setStripeId] = useState(null)
  useEffect(() => {
    setStripeId(user?.user_metadata?.stripe_customer_id)
  }, [user])
  const [text, setText] = useState('')
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);  
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(1);
  const [note, setNote] = useState('');
  
  // COMPANIES
  const [companies, setCompanies] = useState([])
  const fetch_companies = async() => {
    let { data: all_companies, error } = await supabase
    .from('companies')
    .select().eq('user_id', user.id)
    setCompanies(all_companies)
  }
  const [company, setCompany] = useState(null)
  const fetch_company = async() => {
    let { data: the_company, error } = await supabase
    .from('companies')
    setCompany(the_company)
  }
  useEffect(() => {
    fetch_company()
  }, [])
  useEffect(() => {
    fetch_companies()
    setChosen(company)
  }, [company])
  const filtered_companies = companies?.filter(item => item.company_name.includes(text));
  const [chosen, setChosen] = useState({})
  // END COMPANIES

  const addTask = () => {
    const newTask = {
      id: counter,
      quantity: 1,
      tax: false,
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
  
  const amount = calc_amount(tasks)

  const subtotal = amount.subtotal;
  const tax = amount.taxAmount;
  const total = amount.total;

  return (
    <View>
    {stripeId === null || stripeId === 'undefined' ? (<Checking />) :  (
    <ScrollView className="p-2 bg-white">
      <View className="relative">
      <TextInput
          label="Company"
          value={text}
          placeholder='Type company name to send invoice to'
          onChangeText={text => setText(text)}
          backgroundColor="#FFFFFF"
        />
        <TouchableOpacity className="absolute right-0 top-4" onPress={() => navigation.navigate('AddCompany')}>
              <Ionicons style={{textAlign: 'center'}}  name="add-circle-outline" size={24} color={"#2b3252"} />
        </TouchableOpacity>
      </View>
        {filtered_companies?.length === 0 ? 
        <Text className="my-2 text-md text-gray-700">Register company if not found on list.</Text> 
        : <Picker
            selectedValue={chosen}
            style={{ height: "auto", width: "auto" }}
            onValueChange={(chosen, index) => setChosen(chosen)}
          >
      {filtered_companies?.map(item => {
        return <Picker.Item key={item.id} label={item.company_name} value={JSON.stringify(item)} />
      })}
      </Picker>}
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
              style={{ width: '%50' }}
              label="Task amount"
              value={task.number}
              onChangeText={(number) => updateTask(task.id, 'number', number)}
              keyboardType="numeric"
              backgroundColor="white"
            />
            <View className="flex flex-row items-center justify-between my-2 mx-4">
              <View>
                <Text className="font-bold text-md">Qunatity</Text>
              </View>
            <View className="flex flex-row items-center">
              <TouchableOpacity onPress={() => updateTask(task.id, 'quantity', Math.max(task.quantity - 1, 1))}>
                <Ionicons name="remove-circle-outline" size={24} color={"#2b3252"} />
              </TouchableOpacity>
              <Text className="mx-2 font-bold">{task.quantity}</Text>
              <TouchableOpacity onPress={() => updateTask(task.id, 'quantity', task.quantity + 1)}>
                <Ionicons name="add-circle-outline" size={24} color={"#2b3252"} />
              </TouchableOpacity>
            </View>
            </View>
            <View className="flex flex-row items-center justify-between my-2 mx-4">
              <View>
                <Text className="font-bold text-md">GST</Text>
              </View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateTask(task.id, 'tax', !task.tax)}
              value={task.tax}
            />
            </View>
          </View>
        ))}
      </View>
      <View className="my-2">
        <InvoiceBtn icon="add-circle-outline" mode="contained" text={tasks.length > 0 ? 'Add another task' : 'Add a task'} duty={addTask} />
      </View>
    </View>
    <TextInput
              style={{ }}
              label="Additional Notes"
              placeholder='Write a note'
              value={note}
              onChangeText={(note) => setNote(note)}
              backgroundColor="white"
            />
    <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Subtotal</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">{isNaN(subtotal) ? null : `$${subtotal}`}</Text>
        </View>
        <Border />
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Tax</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">{isNaN(tax) ? null : `$${tax}`}</Text>
        </View>
        <Border />
        <View className="flex flex-row items-center justify-between m-4">
          <Text className="font-bold">Total</Text>
          <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 font-bold min-w-[150px] text-center">{isNaN(total) ? null : `$${total}`}</Text>
        </View>
        <InvoiceBtn 
          duty={() => navigation.navigate('PreviewEstimate', {tasks, subtotal, tax, total, chosen, note})} 
          icon="add-circle-outline" 
          text="Save" /> 
          <View className="my-12"></View>
    </ScrollView>)}
    </View>
  )
}

export default AddEstimate