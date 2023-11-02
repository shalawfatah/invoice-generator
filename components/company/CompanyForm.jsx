import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../lib/supabase';
import InvoiceBtn from '../general/Button';
import { ActivityIndicator, TextInput, MD2Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { useAtom } from 'jotai';
import { profileAtom, profileTriggerAtom, userAtom } from '../../lib/store';
import * as FileSystem from 'expo-file-system'

const CompanyForm = () => {
  const [user] = useAtom(userAtom)
  const [profile, setProfile] = useAtom(profileAtom)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [status, setStatus] = useState('')
  const [reload, setReload] = useState(false)
  const url = 'https://bkcsaqsiloxvfsnhymgk.supabase.co/storage/v1/object/public/avatars/';
  const [imgs, setImgs] = useState([])
  const [profileTrigger, setProfileTrigger] = useAtom(profileTriggerAtom)
  
  const get_profile = async() => {
    if(profile === null) {
      const {data, error} = await supabase.from('profile').select().eq('user_id', user.id).single()
      if(error) {
        console.log(error)
        return;
      } else {
        setProfile(data)
      }
    }
  }

  useEffect(() => { 
    get_profile() 
  }, [])

  const updated = {
    name,
    address,
    avatar: photoURL
  }

  const updateProfile = async() => {
    setLoading(true)
    const {data, error} = await supabase.from('profile').update(updated).eq('user_id', user.id)
    if(error) {
      setLoading(false)
      console.log(error)
    } else {
      setLoading(false)
      setProfileTrigger(prev => !prev)
      setStatus('Done')
    }
  }
  
  
  const pickImage = async () => {
    setReload(true)
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if(result.canceled) {
    setReload(false)
    console.log(result)
  }
  if (!result.canceled) {
    const image = result.assets[0]
    const extension = image.uri.substring(result.assets[0].uri.lastIndexOf(".") + 1)
    const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' })
    const filePath = `${user.id}/${new Date().getTime()}.${extension}`
    const contentType = `image/${extension}`

    const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, decode(base64), { contentType })
        if(error) {
          setReload(false)
          console.log(error)
        } else {
          setPhotoURL(url + filePath)
          setReload(false)
          console.log(data)
        }
  } else {
    setReload(false)
    console.log('error')
  }
};
const fetch_images = async() => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .list(`${user.id}`, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })
  if(error) {
    console.log(error)
  }
  setImgs(data)
}

useEffect(() => {
  fetch_images()
}, [])

const filtered_imgs = imgs.filter(item => {
  return item.name.toLowerCase().includes('.jpg') 
          || item.name.toLowerCase().includes('.jpeg') 
          || item.name.toLowerCase().includes('.png')
})

const removeImg = async(item) => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .remove([`${user.id}/${item.name}`])
  if(error) {
    console.log(error)
  }
}

  return (
    <View>
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
            {reload && <ActivityIndicator 
              animating={true} 
              color={MD2Colors.white}
              className="m-2"
              />}
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
          <Text>{status === 'Done' ? 'Profile Updated' : ''}</Text>
    </View>
        <ScrollView className="px-4 py-1">
        <View className="flex flex-col items-start ">
        {filtered_imgs.map(item => {
          const itemName = url + user.id + '/' + item.name;
            return <View key={item.id} className="flex flex-row items-center justify-between w-full">
                      <Image source={{ uri: itemName }} style={{ width: 70, height: 70 }} />
                      <TouchableOpacity onPress={() => removeImg(item)} className="bg-indigo-600 text-white p-3 rounded-full">
                        <Ionicons className=" " name="trash-outline" color={"white"} size={28} />
                      </TouchableOpacity>
                  </View>   
        })}
        </View>
        </ScrollView>
    </View>
  )
}

export default CompanyForm