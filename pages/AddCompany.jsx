import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import InvoiceBtn from '../components/general/Button'
import { SessionContext } from '../App'
import { TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase'

const AddCompany = () => {
    const {id} = useContext(SessionContext);
    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    console.log('user ', id)
  
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
            } else {
                setLoading(false)
                navigation.navigate('AddInvoice')
            }

    }
  
    return (
      <View className="flex justify-center items-center w-screen p-4 bg-white">
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
            
          <View className="my-8 w-full">
            <InvoiceBtn text="Register" mode="contained" duty={add_company}/>
          </View>
      </View>
    )
}

export default AddCompany