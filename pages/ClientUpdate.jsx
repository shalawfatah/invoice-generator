import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const ClientUpdate = ({route}) => {
    const item = route.params;
    const [company, setCompany] = useState(item.item.company_name);
    const [email, setEmail] = useState(item.item.company_email);
    const [address, setAdress] = useState(item.item.company_address);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const updat_company = async() => {
        setLoading(true)
        const { error } = await supabase
            .from('companies')
            .update({ 'company_name': company, 'company_email': email, 'company_address': address })
            .eq('id', item.item.id)
        if(error) {
            console.log(error)
        } else {
            navigation.navigate('Client Archive')
        }
    }

  return (
    <View className="flex justify-center items-center w-screen p-4 bg-white">
    <Text>Update client information</Text>
    <TextInput
        mode={"outlined"}
        label={company}
        placeholder={"Update client name"}
        value={company}
        onChangeText={(company) => setCompany(company)}
        disabled={loading}
        className="w-full my-2"
        outlineColor="#81F3FA"
        theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
        />
    <TextInput
        mode={"outlined"}
        label={email}
        placeholder={"Update client email"}
        value={email}
        onChangeText={(email) => setEmail(email)}
        disabled={loading}
        className="w-full my-2"
        outlineColor="#81F3FA"
        theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
        />
    <TextInput
        mode={"outlined"}
        label={address}
        placeholder={"Update client address"}
        value={address}
        onChangeText={(address) => setAddress(address)}
        disabled={loading}
        className="w-full my-2"
        outlineColor="#81F3FA"
        theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
        />
        
      <View className=" w-full">
        <InvoiceBtn text="Update" icon="folder-open-outline" duty={updat_company}/>
      </View>
      <View className=" w-full">
        <InvoiceBtn text="List of clients" icon="pricetag-outline" duty={() => navigation.navigate('Client Archive')}/>
      </View>
  </View>
  )
}

export default ClientUpdate