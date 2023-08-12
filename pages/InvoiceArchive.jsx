import { View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../App';
import { supabase } from '../lib/supabase';
import InvoiceItem from '../components/invoice/InvoiceItem';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

const InvoiceArchive = () => {
  const {id} = useContext(SessionContext);
  const [invoice, setInvoice] = useState([])
  const navigation = useNavigation()

  const fetch_invoices = async() => {
      let { data: invoices, error } = await supabase
      .from('invoices')
      .select('*, companies("*")')
      .eq('user_id', id)
      if(error) {
        console.log(error)
      } else {
        setInvoice(invoices)
      }
  }

  useEffect(() => {
    fetch_invoices()
  }, [])

  return (
    <ScrollView className="bg-white">
      {invoice.map(item => {
        const time = format(new Date(item.created_at), "dd MMMM yyyy 'at' HH:mm ")
        return <View key={item.id} className="m-2">
                  <InvoiceItem 
                          company={item.companies.company_name} 
                          date={time} 
                          total={item.total}
                          link={() => navigation.navigate('SingleInvoice', {item})}
                          />
               </View>
      })}
    </ScrollView>
  )
}

export default InvoiceArchive