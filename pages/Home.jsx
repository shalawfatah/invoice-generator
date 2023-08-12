import React, { useContext } from 'react'
import { View } from 'react-native'
import CompanyForm from '../components/company/CompanyForm'
import InvoiceBtn from '../components/general/Button'
import { supabase } from '../lib/supabase'
import { SessionContext } from '../App'

const Home = () => {
  const session = useContext(SessionContext);
  const signout = async() => {
      const { error } = await supabase.auth.signOut()
      console.log(error)
  }
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-white">
      <CompanyForm />
      <InvoiceBtn duty={signout} text="Sign Out" />
    </View>
  )
}

export default Home