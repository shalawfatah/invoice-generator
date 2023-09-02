import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider, TextInput } from 'react-native-paper';
import InvoiceBtn from '../general/Button';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const SignIn = ({handleSignup}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [resLoading, setResLoading] = useState(false)
    const [reset, setReset] = useState('');
    const [info, setInfo] = useState(false)

    async function signInWithEmail() {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) Alert.alert(error.message)
      setLoading(false)
    }

    async function resetEmail() {
      setResLoading(true)
      const {data, error} = await supabase.auth.resetPasswordForEmail(reset, {
        redirectTo: 'https://ray-mobile-backend.onrender.com/reset-password',
      }) 
      if(error) {
        console.log(error)
        setResLoading(false)
        return
      } else {
        setResLoading(false)
        setInfo(true)
      }
    }

  return (
    <View className="p-4 my-16">
      <Text className="font-bold text-center text-gray-800">Sign in if you have an account</Text>
    <View >
      <View >
      <TextInput
          mode={"outlined"}
          label={"Email"}
          placeholder={"Write your email"}
          value={email}
          onChangeText={(email) => setEmail(email)}
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
          textColor='#FFF' 
          icon="log-in-outline" 
          classes="my-2"
          loading={loading}
          text="Sign In" duty={() => signInWithEmail()} 
          />
      </View>
      <Divider className="my-1" />
      <Text className="my-2 text-center font-bold text-gray-700">If you don't have an account, create one</Text>

      <View >
        <InvoiceBtn icon="person-circle-outline" classes="my-2" text="Sign Up" duty={handleSignup} />
      </View>
      <Divider className="my-1" />
      <Text className="my-2 text-center font-bold text-gray-700">If you have forgotten your password:</Text>
      <View >
      <View >
      <TextInput
          mode={"outlined"}
          label={"Email"}
          placeholder={"Write your email"}
          value={reset}
          onChangeText={(reset) => setReset(reset)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
      </View>
        <InvoiceBtn 
            icon="refresh-outline" 
            classes="my-2 bg-[#E7625F]" 
            text="Reset Password"
            bg={"#E7625F"}
            textColor='text-white'
            iconColor={"white"}
            duty={resetEmail}
            loading={resLoading} 
          />
      </View>
      {info ? <Text className="my-2 text-center font-bold text-gray-700">Reset link sent to your email, please follow the link to reset your password.</Text> : ''}
    </View>
    </View>
  )
}

export default SignIn