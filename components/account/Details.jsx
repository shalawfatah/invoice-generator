import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { profileAtom, userAtom } from '../../lib/store'
import { supabase } from '../../lib/supabase'

const Details = () => {

    const [user] = useAtom(userAtom)
    const [profile, setProfile] = useAtom(profileAtom)
    
    const checkUser = async () => {
        const { data, error } = await supabase
          .from('profile')
          .select()
          .eq('email', user.email)
          .single();
        if (error) {
          console.log(error);
        } else {
          setProfile(data);
        }
      };

      useEffect(() => {
        checkUser();
      }, []);

  return (
    <>
      <Text className="text-lg font-bold  w-full text-center py-1">Company Profile</Text>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md p-1">Company Name:</Text>
        <Text className="text-md p-1">{profile?.name}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md p-1">Company Email:</Text>
        <Text className="text-md p-1">{profile?.email}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md p-1">Company Address:</Text>
        <Text className="text-md p-1">{profile?.address}</Text>
      </View>
    </>
  )
}

export default Details