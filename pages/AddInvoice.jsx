import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native'
import { calc_amount } from '../util_functions/calc_amount';
import Border from '../components/general/Border';
import { supabase } from '../lib/supabase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Checking from '../components/account/Checking';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { SessionContext } from '../components/general/SessionContext';

const AddInvoice = () => {
  const user = useContext(SessionContext)
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [number, setNumber] = useState('')
  
  const invoiceNum = async() => {
    const {data, error} = await supabase.from('invoices').select().eq('user_id', user.id).eq('type', 'invoice')
    if(error) {
      console.log(error)
      return;
    } else {
      const numeric = Number(data[data.length - 1].document_number) + 1;
      const stringed = numeric.toString()
      setNumber(stringed)
    }
  }

  const checkUser = async() => {
    const {data, error} = await supabase.from('profile').select().eq('email', user.email).single();
    if(error) {
      console.log(error)
    } else {
      setStatus(data.stripe_customer_id)
      setProfile(data)
    }
    setIsLoading(false);
  }

  const [text, setText] = useState('')
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);  
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(1);
  const [note, setNote] = useState('');
  const [chosen, setChosen] = useState(null)
  
  // COMPANIES
  const [companies, setCompanies] = useState([])

  const fetch_companies = async() => {
    let { data: all_companies, error } = await supabase
    .from('companies')
    .select().eq('user_id', user?.id)
    setChosen(all_companies[0])
    setCompanies(all_companies)
  }

  const fetchData = async () => {
    try {
      await checkUser();
      await fetch_companies();
      await invoiceNum(); // You may want to execute this as well, assuming it doesn't depend on the result of checkUser or fetch_companies.
      // Add any other logic that depends on the results of checkUser and fetch_companies here.
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const filtered_companies = companies?.filter(item => item.company_name.includes(text));

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
  const tax = amount.taxAmount.toFixed(2);
  const total = amount.total.toFixed(2);

  const prevInvoice = async() => {
    const choice = typeof chosen !== 'object' ? await JSON.parse(chosen) : chosen;
    await navigation.navigate('PreviewInvoice', {tasks, subtotal, tax, total, choice, note, user, profile, number})
  }

  return (
    <View>
    {isLoading ? (
        <ActivityIndicator 
            animating={true} 
            color={MD2Colors.black}
            className="mx-1 p-8"
            />
      ) : (
    <View>
      {status === null ? (<Checking />) :  (
    <ScrollView className="p-2 bg-white">
      <View className="relative">
      <TextInput
          label="Search For Clients"
          value={text}
          placeholder='Type client name to send invoice to'
          onChangeText={text => setText(text)}
          backgroundColor="#FFFFFF"
        />
        <TouchableOpacity className="absolute right-0 top-4" onPress={() => navigation.navigate('AddCompany')}>
              <Ionicons style={{textAlign: 'center'}}  name="add-circle" size={24} color={"#2b3252"} />
        </TouchableOpacity>
      </View>
        {filtered_companies?.length === 0 ? 
        <View className="flex flex-row items-center justify-center my-2">
          <Text className="">If not found. Tap</Text>
          <TouchableOpacity className="mx-1" onPress={() => navigation.navigate('AddCompany')}>
              <Ionicons  name="add-circle" size={24} color={"#2b3252"} />
        </TouchableOpacity>
        <Text>to add clients</Text>
        </View>
        : <Picker
            selectedValue={chosen}
            style={{ height: "auto", width: "auto" }}
            onValueChange={(chosen, index) => setChosen(chosen)}
          >
      {filtered_companies?.map(item => {
        return <Picker.Item key={item.id} label={item.company_name} value={JSON.stringify(item)} />
      })}
      </Picker>}
    <View className="bg-[#f5f5f5] px-2">
      <View>
        {tasks.map((task) => (
          <View key={task.id}>
            <TextInput
              style={{  }}
              label="Task description"
              value={task.text}
              onChangeText={(text) => updateTask(task.id, 'text', text)}
              backgroundColor="#f5f5f5"
            />
            <TextInput
              style={{ width: '%50' }}
              label="Task amount"
              value={task.number}
              onChangeText={(number) => updateTask(task.id, 'number', number)}
              keyboardType="numeric"
              backgroundColor="#f5f5f5"
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
        <InvoiceBtn icon="add-circle-outline" text={tasks.length > 0 ? 'Add another task' : 'Add a task'} duty={addTask} />
      </View>
    </View>
    <View>
    <TextInput
              style={{ }}
              label="Invoice Number"
              keyboardType='numeric'
              placeholder='Invoice number'
              value={number}
              onChangeText={(number) => setNumber(number)}
              backgroundColor="white"
            />
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
          duty={prevInvoice} 
          icon="bookmark-outline" 
          mode="contained" 
          text="Save" /> 
          <View className="my-12"></View>
    </ScrollView>
    )}
    </View>)}
    </View>
  )
}

export default AddInvoice