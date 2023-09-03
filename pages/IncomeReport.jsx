import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Checking from '../components/account/Checking';
import { supabase } from '../lib/supabase';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import MenuButtons from '../components/general/MenuButtons';
import { SessionContext } from '../components/general/SessionContext';
import IncomePerMonth from '../components/reports/IncomePerMonth';

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
  }, [user])
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
        <ScrollView>
          <View className="p-2">
            <Text className="text-center text-md my-2">Reports and Charts will be available about your income soon</Text>
          </View>
        </ScrollView>
      )}</View>)}
      </ScrollView>
      <View className="absolute bottom-40 h-32 w-full z-32">
        <MenuButtons />
      </View>
    </View>
  )
}

export default IncomeReport