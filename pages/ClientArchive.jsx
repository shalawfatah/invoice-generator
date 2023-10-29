import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { supabase } from '../lib/supabase'
import SingleCompany from '../components/company/SingleCompany'
import { useNavigation } from '@react-navigation/native'
import InvoiceBtn from '../components/general/Button'
import { sessionAtom, userAtom } from '../lib/store'
import { useAtom } from 'jotai'

const ClientArchive = () => {
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom)
  const [companies, setCompanies] = useState([])
  const navigation = useNavigation()

  const client_fetcher = async() => {
    const {data, error} = await supabase.from('companies').select('*').eq('user_id', user.id)
    if(error) {
      console.log(error)
    }
    setCompanies(data)
  }

  const delete_client = async(client_id) => {
    const {error} = await supabase.from('companies').delete().eq('id', client_id)
    if(error) {
      console.log(error)
    } else {
      navigation.navigate('Client Archive')
    }
  }

  useEffect(() => {
    client_fetcher()
  }, [])

  return (
    <View className="bg-white">
      <View className="my-2 mx-4">
        <InvoiceBtn duty={() => navigation.navigate('AddCompany')} text="Add Client" icon="add-outline" />
      </View>
    <ScrollView className="bg-[#fbfbfb] p-1">
      {companies?.map(item => {
        return <View key={item.id}>
                <SingleCompany 
                    name={item.company_name} 
                    email={item.company_email}
                    delete_client={() => delete_client(item.id)}
                    update_client={() => navigation.navigate('Client Update', {item})}
                    />
               </View>
      })}
    </ScrollView>
    </View>
  )
}

export default ClientArchive