import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import InvoiceInput from './InvoiceInput';
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SessionContext } from '../general/SessionContext';
import { supabase } from '../../lib/supabase';
import InvoiceBtn from '../general/Button';

const CompanyForm = () => {
  const session = useContext(SessionContext)
  const navigation = useNavigation()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const get_profile = async() => {
    const {data, error} = await supabase.from('profile').select().eq('user_id', session.id).single()
    if(error) {
      console.log(error)
      return;
    } else {
      setProfile(data)
    }
  }

  useEffect(() => { get_profile() }, [])

  const updateProfile = async() => {

  }
  
  const [image, setImage] = useState(null)
  const [imgName, setImgName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState('')
  
  const pickImage = () => {
    
  }

  return (
    <View className="flex justify-center items-center w-screen p-4">
        <InvoiceInput 
            mode="outlined" 
            label={profile.name}
            placeholder="Write your company's name..." 
            />
        <InvoiceInput 
            mode="outlined" 
            label={profile.address}
            placeholder="Write your company's address..." 
            />
        <View className="my-8 w-full">
          <Text className="text-xs text-gray-400">Tap to upload logo to be printed on invoices/estimates</Text>
            <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
                <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
            </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        </View>
        <InvoiceBtn 
          disabled={loading} 
          buttonColor='#312e81' 
          textColor='#FFF' 
          icon="business-outline" 
          classes="my-2"
          loading={loading} 
          text="Update Profile" 
          duty={updateProfile} 
        />
    </View>
  )
}

export default CompanyForm