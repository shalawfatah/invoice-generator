import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../App';
import Checking from '../components/account/Checking';
import { supabase } from '../lib/supabase';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import MenuButtons from '../components/general/MenuButtons';

const IncomeReport = () => {
  const user = useContext(SessionContext);
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async() => {
    const {data, error} = await supabase.from('profile').select().eq('email', user.email).single();
    if(error) {
      console.log(error)
    } else {
      setStatus(data.subscription_status)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkUser()
  }, [status, user])
  return (
    <View className="h-screen relative">
    <ScrollView className="bg-white">
    {isLoading ? (
        <ActivityIndicator 
            animating={true} 
            color={MD2Colors.black}
            className="mx-1 p-8"
            />
      ) : (
    <View>
      {status !== 'active' ? (<Checking />) :  (
        <Text>hello</Text>
      )}</View>)}
      </ScrollView>
      <View className="absolute bottom-48 h-32 w-full z-32">
        <MenuButtons />
      </View>
    </View>
  )
}

export default IncomeReport