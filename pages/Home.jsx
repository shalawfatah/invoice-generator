import React from 'react'
import { View } from 'react-native'
import CompanyForm from '../components/company/CompanyForm'

const Home = () => {
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-white">
      <CompanyForm />
    </View>
  )
}

export default Home