import { View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../App';
import { supabase } from '../lib/supabase';
import InvoiceItem from '../components/invoice/InvoiceItem';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import MenuButtons from '../components/general/MenuButtons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Checking from '../components/account/Checking';

const InvoiceArchive = () => {
  const {id} = useContext(SessionContext);
  const [invoice, setInvoice] = useState([])
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null)

  const fetch_invoices = async() => {
      let { data: invoices, error } = await supabase
      .from('invoices')
      .select('*, companies("*")')
      .eq('user_id', id).eq('type', 'invoice')
      if(error) {
        console.log(error)
      } else {
        setInvoice(invoices)
      }
    setIsLoading(false);
  }

  useEffect(() => {
    fetch_invoices()
  }, [invoice])

  const checkUser = async() => {
    const {data, error} = await supabase.from('profile').select().eq('user_id', id).single();
    if(error) {
      console.log(error)
    } else {
      setStatus(data.subscription_status)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkUser()
  }, [id])

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
      {status !== 'active' ? (<Checking />) :  (
    <View className="h-screen">
    <ScrollView className="bg-white py-1">
      {invoice.map(item => {
        const time = format(new Date(item.created_at), "dd MMMM yyyy 'at' HH:mm ")
        return <View key={item.id} className="mx-2">
                  <InvoiceItem 
                          company={item.companies.company_name} 
                          date={time} 
                          total={item.total}
                          link={() => navigation.navigate('SingleInvoice', {item})}
                          />
               </View>
      })}
    </ScrollView>
      <View className="absolute bottom-48 h-32 w-full z-32">
        <MenuButtons />
      </View>
    </View>
        )}
        </View>)}
        </View>
  )
}

export default InvoiceArchive