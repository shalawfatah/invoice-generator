import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import InvoiceBtn from '../general/Button'
import { useNavigation } from '@react-navigation/native'
import { useStripe } from '@stripe/stripe-react-native'

const ProductCard = ({name, price, subscribe}) => {
  return (
    <View className="bg-white p-4 m-4 shadow-sm">
      <Text className="font-bold text-lg my-2">{name}</Text>
      <Text className="text-md my-2">Price: ${price / 100} per month</Text>
      <InvoiceBtn icon={"bag-check-outline"} text="Subscribe" duty={subscribe} classes="my-2" />
    </View>
  )
}

const SubscribePackages = ({route}) => {
  const API_URL = "https://ray-mobile-backend.onrender.com";
  const [packages, setPackages] = useState([]);
  const {customer} = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const fetch_prices = async() => {
    const response = await fetch(`${API_URL}/prices`);
    const result = await response.json();
    setPackages(result)
  }

  const subscribe = async(item) => {
    const itemId = item.id;
    const amount = item.unit_amount;
    const response = await fetch(`${API_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: `${itemId}`,
        customerId: `${customer}`,
        amount: `${amount}`
      }),
    })
    const data = await response.json()
    if (!response.ok) return Alert.alert(data);
    const clientSecret = data.clientSecret;
    setLoading(false)
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customerId: customer,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    Alert.alert("Payment complete, thank you!");
    await navigation.navigate('Templates', {data})
  }

  useEffect(() => {
    fetch_prices()
  }, [])
  return (
    <View>
      {packages?.prices?.data?.map(item => {
        return <View key={item.id}>
                  <ProductCard 
                    name={"Pro Package"} 
                    price={item.unit_amount} 
                    subscribe={() => subscribe(item)} 
                  />
              </View>
      })}
    </View>
  )
}

export default SubscribePackages