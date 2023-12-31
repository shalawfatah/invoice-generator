import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { TextInput, Title } from 'react-native-paper';
import InvoiceBtn from "../general/Button";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from "../../lib/supabase";
import { decode } from 'base64-arraybuffer';
import { useAtom } from "jotai";
import { logoTriggerAtom, userAtom } from "../../lib/store";

const CompanyRegister = () => {
  
  const [user] = useAtom(userAtom)
  const email = user.email;
  const [name, setName] = useState('');
  const [gst, setGst] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState('');
  const navigation = useNavigation();
  const [logoTrigger, setLogoTrigger] = useAtom(logoTriggerAtom)
  
  const fetchSession = async () => {
    setLoading(true);
    const {data, error} = await supabase.from('profile').update({name, email, address, avatar: photoURL, website, phone, gst_number: gst, signature}).eq('email', user.email)
    if(error) {
      setLoading(false)
      Alert.alert(error.detail)
    } 
    setLoading(false)
    navigation.navigate('Subscribe Packages')
  };
  

  // LOGO
  const [image, setImage] = useState(null)
  const [imgName, setImgName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState('')
  const [loader, setLoader] = useState(false)

  const pickImage = async () => {
        setLoading(true)
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
            } else {
              setLogoTrigger(prev => !prev)
              setLoading(false)
            }
      }
    };
  // END LOGO

    // SIGNATURE
    const [signature, setSignature] = useState(null)
    const [sigName, setSigName] = useState('')
    const [photoSig, setPhotoSig] = useState(null)
    const [photoSigURL, setPhotoSigURL] = useState('')
  
    const pickSignature = async () => {
          setLoader(true)
          let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });    
        if (!result.canceled) {
              setSignature(result.assets[0].uri);
              const body = new FormData();
              const regex = /ImagePicker\/(.*)/;
              const res = result.assets[0].uri.match(regex)[1];
              let newName = Date.now() + res;
              setSigName(newName)
              body.append('upload', {
                uri: result.assets[0].uri,
                name: newName,
                type: result.assets[0].type,
              });
              setPhotoSig(body)
              const { data, error } = await supabase
              .storage
              .from('signatures')
              .upload(newName, decode('base64FileData'), {
                contentType: 'image/*'
              })
              const url = 'https://bkcsaqsiloxvfsnhymgk.supabase.co/storage/v1/object/public/signatures/' + newName;
              setPhotoSigURL(url)
              if(error) {
                console.log(error)
              } else {
                setLogoTrigger(prev => !prev)
                setLoading(false)
              }
        }
      };
    // END SIGNATURE

  return (
    <ScrollView className="bg-white p-4 min-h-screen">
      <View className="pb-64">
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
    <TextInput
      mode={"outlined"}
      label={"Company's GST Number"}
      placeholder={"Write your company's GST Number"}
      value={address}
      onChangeText={(gst) => setGst(gst)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
    <TextInput
      mode={"outlined"}
      label={"Company's Phone Number"}
      placeholder={"Write your company's Phone Number"}
      value={address}
      onChangeText={(phone) => setPhone(phone)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
    <TextInput
      mode={"outlined"}
      label={"Company's Website"}
      placeholder={"Write your company's website"}
      value={address}
      onChangeText={(website) => setWebsite(website)}
      disabled={loading}
      className="w-full my-2"
      outlineColor="#81F3FA"
      theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
      />
        <View className="my-2 w-full">
        <Text className="text-lg font-bold text-gray-600">Company's Logo</Text>
          <Text className="text-xs text-gray-400">Tap to upload logo to be printed on invoices/estimates</Text>
            <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
                <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
            </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        </View>
        <View className="my-2 w-full">
        <Text className="text-lg font-bold text-gray-600">Your Signature</Text>
          <Text className="text-xs text-gray-400">If you want your signature printed on documents, upload it here</Text>
            <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickSignature}>
                <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
            </TouchableOpacity>
              {signature && <Image source={{ uri: signature }} style={{ width: 100, height: 100 }} />}
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
  </ScrollView>
  )
}

export default CompanyRegister