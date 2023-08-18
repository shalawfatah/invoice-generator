import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import InvoiceBtn from '../general/Button';
import { supabase } from '../../lib/supabase';

const SignIn = ({handleSignup}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) Alert.alert(error.message)
      setLoading(false)
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
          icon="email" 
          classes="my-2"
          loading={loading}
          text="Sign In" duty={() => signInWithEmail()} 
          />
      </View>
      <View >
        <InvoiceBtn icon="account" classes="my-2" text="Sign Up" duty={handleSignup} />
      </View>
    </View>
    </View>
  )
}

export default SignIn