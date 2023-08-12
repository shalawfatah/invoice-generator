import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { supabase } from '../../lib/supabase'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../general/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const SignUp = ({handleSignin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imgName, setImgName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState('');

    const pickImage = async () => {
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
        const newName = Date.now() + res;
        setImgName(newName)
        body.append('upload', {
          uri: result.assets[0].uri,
          name: newName,
          type: result.assets[0].type,
        });
        setPhoto(body)
        const {data, error} = await supabase.storage.from('avatars')
        .upload(imgName, photo)
        const url = 'https://wpgudirqvazauqnseyvk.supabase.co/storage/v1/object/public/avatars/' + newName;
        await setPhotoURL(url)
      }
    };

    async function signUpWithEmail() {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
              data: {
                company: company,
                avatar: photoURL,
                address: address,
              },
            },
        })
        if(error) {
          console.log(error)
        }
        handleSignin()
      }
  return (
    <View className="p-4 my-16">
      <Text className="font-bold text-center text-gray-400">Please provide your company's credentials</Text>
    <View >
      <View >
      <TextInput
          mode={"outlined"}
          label={"Company Email"}
          placeholder={"Write your company's email"}
          value={email}
          onChangeText={(email) => setEmail(email)}
          onCh
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>
      <View>
      <TextInput
          mode={"outlined"}
          label={"Password"}
          placeholder={"Write your password"}
          value={password}
          onChangeText={(password) => setPassword(password)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>
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
        <Text className="my-2 text-md font-bold text-gray-400">Company's Logo</Text>
      <View className="my-2 mx-auto">
        <Text className="text-xs text-center text-gray-400">Tap the icon upload company's logo. It will be used on your invoices.</Text>
          <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
              <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
          </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        </View>
      <View>
        <InvoiceBtn buttonColor='#312e81' textColor='#FFF' icon="email" classes="my-2" text="Sign Up" duty={() => signUpWithEmail()} />
      </View>
      <View >
        <InvoiceBtn icon="account" classes="my-2" text="Sign In" duty={handleSignin} />
      </View>
    </View>
    </View>
  )
}

export default SignUp;