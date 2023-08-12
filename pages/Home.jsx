import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { supabase } from '../lib/supabase'
import { SessionContext } from '../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const user = useContext(SessionContext);
  const navigation = useNavigation()
  const signout = async() => {
      const { error } = await supabase.auth.signOut()
      console.log(error)
  }
  
  const edit_user = () => {
    navigation.navigate('EditProfile', {user})
  }

  const delete_user = async() => {
    const { data, error } = await supabase.auth.admin.deleteUser(user.id)
    if(error) {
      console.log(error)
    }
  }
  
  return (
    <View className="flex h-screen w-screen items-center bg-white p-2">
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Image source={{ uri: user.user_metadata.avatar }} style={{ width: 100, height: 100 }} />
      </View>
      <Text className="text-lg font-bold bg-indigo-100 w-full text-center py-1">Company Profile</Text>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Company Name:</Text>
        <Text className="text-md font-bold p-1">{user.user_metadata.company}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Company Email:</Text>
        <Text className="text-md font-bold p-1">{user.email}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Company Email:</Text>
        <Text className="text-md font-bold p-1">{user.user_metadata.address}</Text>
      </View>
      <TouchableOpacity onPress={signout} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-2">
          <Text className="mx-2 font-bold text-black">Sign Out</Text>
          <Ionicons name="log-out-outline" color={"black"} size={20} />
        </TouchableOpacity>
      <TouchableOpacity onPress={edit_user} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-2">
          <Text className="mx-2 font-bold text-black">Edit Profile</Text>
          <Ionicons name="create-outline" color={"black"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={delete_user} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-2">
          <Text className="mx-2 font-bold text-white">Delete Profile</Text>
          <Ionicons name="trash-outline" color={"white"} size={20} />
        </TouchableOpacity>
    </View>
  )
}

export default Home