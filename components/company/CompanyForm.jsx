import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../lib/supabase';
import InvoiceBtn from '../general/Button';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { useAtom } from 'jotai';
import { sessionAtom, userAtom } from '../../lib/store';

const CompanyForm = () => {
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom)
  const navigation = useNavigation()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  
  const get_profile = async() => {
    const {data, error} = await supabase.from('profile').select().eq('user_id', user.id).single()
    if(error) {
      console.log(error)
      return;
    } else {
      setProfile(data)
    }
  }

  useEffect(() => { get_profile() }, [])

  const updated = {
    name,
    address,
    avatar: photoURL
  }

  const updateProfile = async() => {
    setLoading(true)
    const {data, error} = await supabase.from('profile').update(updated).eq('user_id', user.id)
    if(error) {
      console.log(error)
      setLoading(false)
    } else {
      setLoading(false)
      navigation.navigate('Account')
    }
  }
  
  const [image, setImage] = useState(profile?.avatar)
  const [imgName, setImgName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState('')
  
  const pickImage = async () => {
    setLoading(true)
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });    
  if (!result.canceled) {
        setImage(result.assets[0].uri);
        const body = new FormData();
        const regex = /ImagePicker\/(.*)/;
        const res = result.assets[0].uri.match(regex)[1];
        let newName = Date.now() + res;
        setImgName(newName)
        body.append('upload', {
          uri: result.assets[0].uri,
          name: newName,
          type: result.assets[0].type,
        });
        setPhoto(body)
        const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload(newName, decode('base64FileData'), {
          contentType: 'image/*'
        })
        const url = 'https://bkcsaqsiloxvfsnhymgk.supabase.co/storage/v1/object/public/avatars/' + newName;
        setPhotoURL(url)
        if(error) {
          console.log(error)
          setLoading(false)
        } else {
          setLoading(false)
        }
  }
};

  return (
    <View className="flex justify-center items-center w-screen p-4">
        <TextInput 
          mode={"outlined"}
          label={profile?.name}
          placeholder={"Write your company's name..."}
          value={name}
          onChangeText={(name) => setName(name)}
          className="w-full bg-white"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }} 
        />
        <TextInput 
          mode={"outlined"}
          label={profile?.address}
          placeholder={"Write your company's address..."}
          value={address}
          onChangeText={(address) => setAddress(address)}
          className="w-full bg-white"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }} 
        />
        <View className="my-8 w-full">
          <Text className="text-xs text-gray-400">Tap to upload logo to be printed on invoices/estimates</Text>
            <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
                <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
            </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
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
    </View>
  )
}

export default CompanyForm