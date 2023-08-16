import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from 'react-native-paper';
import InvoiceBtn from "../general/Button";
import { useStripe } from "@stripe/stripe-react-native";
import ProductCard from './ProductCard'

const CheckoutScreen = () => {
    const API_URL = "https://ray-mobile-backend.onrender.com";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState('');
    const [show, setShow] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [pay, setPay] = useState(false);


    const fetchSession = async() => {
    const response = await fetch(`${API_URL}/create-customer`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          address: address
        }),
    })
    const result = await response.json()
    setCustomerId(result.customer.id)
    setShow(true)
  }

  const createSubscription = async() => {
    const response = await fetch(`${API_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: "price_1NeWU1K1omnuMJYrpXSUzc1H",
        customerId: customerId,
      }),
    })
    const result = await response.json()
    setPay(true)
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
        <TextInput
          mode={"outlined"}
          label={"Email"}
          placeholder={"Write your email"}
          value={email}
          onChangeText={(email) => setEmail(email)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
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
        <InvoiceBtn buttonColor='#312e81' textColor='#FFF' icon="domain" classes="my-2" text="Register" duty={fetchSession} />
        {show && <InvoiceBtn text="Subscribe" buttonColor='#312e81' textColor='#FFF' icon="domain" classes="my-2" duty={createSubscription} />}
        {pay && <ProductCard id={customerId} amount={"2000"} email={email} />}
      </View>
    );
  }

  export default CheckoutScreen;