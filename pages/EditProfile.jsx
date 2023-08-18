import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../components/general/Button';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const EditProfile = ({route}) => {
  const {user} = route.params;
  const [company, setCompany] = useState(user.user_metadata.company);
  const [address, setAddress] = useState(user.user_metadata.address);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const updateUser = async() => {
    const { data, error } = await supabase.auth.updateUser({
      data: { company, address }
    })
    if(error) {
      console.log(error)
    } else {
      navigation.navigate('Account')
    }
  }

  return (
    <View className="bg-white p-2">
      <View>
      <TextInput
          mode={"outlined"}
          label={"Company Name"}
          placeholder={"Write your compmany name"}
          value={company}
          onChangeText={(company) => setCompany(company)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>
      <View>
      <TextInput
          mode={"outlined"}
          label={"Company Address"}
          placeholder={"Write your compmany address"}
          value={address}
          onChangeText={(address) => setAddress(address)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>
      <View>
        <InvoiceBtn buttonColor='#312e81' textColor='#FFF' icon="email" classes="my-2" text="Sign Up" duty={() => updateUser()} />
      </View>
      <View >
    </View>
    </View>
  )
}

export default EditProfile