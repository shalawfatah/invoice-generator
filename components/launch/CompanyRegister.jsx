import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from 'react-native-paper';
import InvoiceBtn from "../general/Button";
import { useNavigation } from "@react-navigation/native";
import { SessionContext } from "../../App";

const CompanyRegister = () => {
  const session = useContext(SessionContext)
  const API_URL = "https://ray-mobile-backend.onrender.com";
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {setEmail(session?.email)}, [session])

  const fetchSession = async() => {
    setLoading(true)
    const response = await fetch(`${API_URL}/create-customer`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          description: address
        }),
    })
    const result = await response.json()
    setCustomerId(result.customer.id);
    const customer = result.customer.id
    setLoading(false);
    await navigation.navigate('Subscribe Packages', {customer})
  }

  return (
    <View className="bg-white p-4 min-h-screen">
    <Text className="text-lg font-bold text-gray-600">Register your company</Text>
    <TextInput
      mode={"outlined"}
      label={"Company Name"}
      placeholder={"Write your company's name"}
      value={name}
      onChangeText={(name) => setName(name)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
    {email !== null && <TextInput
      mode={"outlined"}
      label={"Company Email"}
      placeholder={"Write your email"}
      value={email}
      disabled={true}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />}
    <TextInput
      mode={"outlined"}
      label={"Company's Address"}
      placeholder={"Write your company's address"}
      value={address}
      onChangeText={(address) => setAddress(address)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
    <InvoiceBtn disabled={loading} buttonColor='#312e81' textColor='#FFF' icon="domain" classes="my-2" text="Register" duty={fetchSession} />
  </View>
  )
}

export default CompanyRegister