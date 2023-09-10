import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, Text, Platform } from 'react-native'
import { supabase } from '../lib/supabase';
import InvoiceItem from '../components/invoice/InvoiceItem';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import MenuButtons from '../components/general/MenuButtons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Checking from '../components/account/Checking';
import { SessionContext } from '../components/general/SessionContext';

const InvoiceArchive = () => {
  const user = useContext(SessionContext);
  const [invoice, setInvoice] = useState([])
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null)

  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    setIsIos(Platform.OS === 'ios');
  }, []);

  const fetch_invoices = async() => {
      let { data: invoices, error } = await supabase
      .from('invoices')
      .select('*, companies("*")')
      .eq('user_id', user?.id).eq('type', 'invoice')
      if(error) {
        console.log(error)
      } else {
        setInvoice(invoices)
      }
    setIsLoading(false);
  }


  const checkUser = async() => {
    const {data, error} = await supabase.from('profile').select().eq('user_id', user?.id).single();
    if(error) {
      console.log(error)
    } else {
      setStatus(data.stripe_customer_id)
    }
    setIsLoading(false);
  }

  const fetchData = async () => {
    try {
      await checkUser();
      await fetch_invoices();
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, [user])

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
    <View className="h-screen">
    <ScrollView className="bg-white py-1">
      {invoice.length > 0 ? invoice?.map(item => {
        const time = format(new Date(item.created_at), "dd MMMM yyyy 'at' HH:mm aa")
        return <View key={item.id} className="mx-2">
                  <InvoiceItem 
                          company={item?.companies?.company_name} 
                          date={time} 
                          total={item?.total}
                          link={() => navigation.navigate('SingleInvoice', {item})}
                          />
               </View>
      }) : <Text className="text-center my-2">No invoices</Text>}
    </ScrollView>
      <View className={`absolute ${isIos ? 'bottom-40' : 'bottom-28'} h-32 w-full z-3`}>
        <MenuButtons />
      </View>
    </View>
        )}
        </View>)}
        </View>
  )
}

export default InvoiceArchive