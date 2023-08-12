import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = () => {
  const [sign, setSign] = useState(true)
  return (
    <View>
      {sign ? <SignIn handleSignup={() => setSign(false)} /> : <SignUp handleSignin={() => setSign(true)} />}
    </View>
  )
}

export default Auth