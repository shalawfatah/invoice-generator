import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Divider, TextInput } from 'react-native-paper';
import InvoiceBtn from '../general/Button';

const SignUp = ({handleSignin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imgName, setImgName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState('');

    async function signUpWithEmail() {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
              data: {
                avatar: photoURL,
                subscription_status: null,
                price: null,
                stripe_customer_id: null
              },
            },
        })
        if(error) {
          Alert.alert(error.message)
        }
        handleSignin()
      }
  return (
    <View className="p-4 my-16">
      <Text className="font-bold text-center text-gray-800">Create an account</Text>
    <View >
      <View >
      <TextInput
          mode={"outlined"}
          label={"Email"}
          placeholder={"Write your email"}
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
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>

      <View>
        <InvoiceBtn 
            buttonColor='#312e81' 
            textColor='#FFF' icon="person-add-outline" 
            classes="my-2" 
            text="Sign Up"
            loading={loading}
            duty={() => signUpWithEmail()} 
            />
      </View>
        <Divider className="my-1" />
        <Text className="my-2 text-center font-bold text-gray-700">If you have an account, sign in</Text>
      <View >
        <InvoiceBtn icon="log-in-outline" classes="my-2" text="Sign In" duty={handleSignin} />
      </View>
    </View>
    </View>
  )
}

export default SignUp;