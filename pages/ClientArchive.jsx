import { ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { SessionContext } from '../App'
import SingleCompany from '../components/company/SingleCompany'
import { useNavigation } from '@react-navigation/native'

const ClientArchive = () => {

  const [companies, setCompanies] = useState([])
  const user = useContext(SessionContext);
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
  }, [companies])

  return (
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
  )
}

export default ClientArchive