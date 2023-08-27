import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput } from 'react-native-paper';
import InvoiceBtn from "../general/Button";
import { useNavigation } from "@react-navigation/native";
import { SessionContext } from "../general/SessionContext";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from "../../lib/supabase";
import { decode } from 'base64-arraybuffer'

const CompanyRegister = () => {
  const session = useContext(SessionContext)
  const API_URL = "https://ray-mobile-backend.onrender.com";
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {setEmail(session?.email)}, [session])

  const fetchSession = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/create-customer`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          address: address,
          avatar: photoURL,
        }),
      });
  
      if (!response.ok) {
       Alert.alert(`Network response was not ok. Status: ${response.status}`);
      }
  
      const result = await response.json();
      await setCustomerId(result.customer.id);
      const customer = await result.customer.id;
      setLoading(false);
      await navigation.navigate('Subscribe Packages', { customer });
    } catch (error) {
      console.error('Error fetching session:', error);
      setLoading(false);
      // Handle the error here, e.g., show an error message to the user
    }
  };
  

  // LOGO
  const [image, setImage] = useState(null)
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
            console.log('nnn ', newName)
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
            } else {
              setLoading(false)
            }
      }
    };
  // END LOGO

  return (
    <View className="bg-white p-4 min-h-screen">
    <Text className="text-lg font-bold text-gray-600">Register your company</Text>
    <TextInput
      mode={"outlined"}
      label={"Company Name"}
      placeholder={"Write your company's name"}
      value={name}
      onChangeText={(name) => setName(name)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
    {email !== null && <TextInput
      mode={"outlined"}
      label={"Company Email"}
      placeholder={"Write your email"}
      value={email}
      disabled={true}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />}
    <TextInput
      mode={"outlined"}
      label={"Company's Address"}
      placeholder={"Write your company's address"}
      value={address}
      onChangeText={(address) => setAddress(address)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
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
          text="Register" 
          duty={fetchSession} 
        />
  </View>
  )
}

export default CompanyRegister