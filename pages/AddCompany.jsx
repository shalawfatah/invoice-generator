import { View, Text, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import InvoiceBtn from '../components/general/Button'
import { TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase'
import { SessionContext } from '../components/general/SessionContext';

const AddCompany = () => {
    const session = useContext(SessionContext);
    const id = session?.id;
    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
      
    const navigation = useNavigation()
    const add_company = async() => {
            setLoading(true)
            const { data, error } = await supabase
            .from('companies')
            .insert([{
                company_name: company,
                company_email:email,
                company_address:address,
                user_id: id
            }])
            .select()
            if(error) {
                console.log(error)
                Alert.alert(error.details)
                setLoading(false)
            } else {
                setLoading(false)
                navigation.navigate('Client Archive')
            }

    }
  
    return (
      <View className="flex justify-center items-center w-screen p-4 bg-white">
        <Text>Add a client you want to bill</Text>
        <TextInput
            mode={"outlined"}
            label={"Company Name"}
            placeholder={"Write the company's name"}
            value={company}
            onChangeText={(company) => setCompany(company)}
            disabled={loading}
            className="w-full my-2"
            outlineColor="#81F3FA"
            theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
            />
        <TextInput
            mode={"outlined"}
            label={"Company Email"}
            placeholder={"Write the company's email"}
            value={email}
            onChangeText={(email) => setEmail(email)}
            disabled={loading}
            className="w-full my-2"
            outlineColor="#81F3FA"
            theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
            />
        <TextInput
            mode={"outlined"}
            label={"Company Address"}
            placeholder={"Write the company's address"}
            value={address}
            onChangeText={(address) => setAddress(address)}
            disabled={loading}
            className="w-full my-2"
            outlineColor="#81F3FA"
            theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
            />
            
          <View className=" w-full">
            <InvoiceBtn text="Register" icon="business-outline" duty={add_company}/>
          </View>
          <View className=" w-full">
            <InvoiceBtn text="List of clients" icon="pricetag-outline" mode="contained" duty={() => navigation.navigate('Client Archive')}/>
          </View>
      </View>
    )
}

export default AddCompany