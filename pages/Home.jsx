import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { supabase } from '../lib/supabase'
import { SessionContext } from '../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InvoiceBtn from '../components/general/Button';
import Checking from '../components/account/Checking';
import { Divider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import MenuButtons from '../components/general/MenuButtons';

const Home = () => {
      const user = useContext(SessionContext);
      const [profile, setProfile] = useState(null);
      const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      };

      useEffect(() => {
        checkUser();
      }, [user]);

      const status = profile?.subscription_status;
      const stripeId = profile?.stripe_customer_id;
      const navigation = useNavigation();

      const signout = async () => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
      };

      const edit_user = () => {
        navigation.navigate('EditProfile', { user });
      };

      const delete_user = async () => {
        const { data, error } = await supabase.auth.admin.deleteUser(user.id);
        if (error) {
          console.log(error);
        }
      };

  return (
    <View className="bg-white min-h-screen relative">
      <ScrollView>
      <View className="p-2">
        <InvoiceBtn text="Invoice Archive" duty={() => navigation.navigate('Archive')} icon="file-tray-full" />
        <InvoiceBtn text="Estimate Archive" duty={() => navigation.navigate('EstimateArchive')} icon="file-tray-stacked" />
        <InvoiceBtn text="Clientele List" duty={() => navigation.navigate('Client Archive')} icon="list" />
        <InvoiceBtn text="Add Clients" duty={() => navigation.navigate('AddCompany')} icon="add-circle" />
        <InvoiceBtn text="Invoice Templates" duty={() => navigation.navigate('Templates')} icon="document" />
      </View>
    <Divider />
    {isLoading ? (
        <ActivityIndicator 
            animating={true} 
            color={MD2Colors.black}
            className="mx-1 p-8"
            />
      ) : (
    <View>
      {stripeId === null || stripeId === 'undefined' ? (<Checking />) :  (
    <View className="flex w-screen items-center bg-white p-2">
      <Text className="text-lg font-bold bg-indigo-100 w-full text-center py-1">Company Profile</Text>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Company Name:</Text>
        <Text className="text-md font-bold p-1">{profile?.name}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Company Email:</Text>
        <Text className="text-md font-bold p-1">{profile?.email}</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
        <Text className="text-md font-bold p-1">Subscription Status:</Text>
        <View className={`flex flex-row gap-x-2 items-center p-1 px-1 pr-4  ${status === 'active' ? 'bg-[#09A144]' : 'bg-[#D30000]'}`}>
          {status === 'active' ? <Ionicons name="play-circle-outline" size={20} color={"white"}/> : <Ionicons name="stop-circle-outline" size={20} color={"white"}/>}
          <Text className="text-white font-bold">{profile?.subscription_status}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={edit_user} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 font-bold text-black">Edit Profile</Text>
          <Ionicons name="create-outline" color={"black"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={delete_user} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 font-bold text-white">Delete Profile</Text>
          <Ionicons name="trash-outline" color={"white"} size={20} />
        </TouchableOpacity>
    </View>
        )}
        </View> )}
        <View className="px-2">
      <TouchableOpacity onPress={signout} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2">
          <Text className="mx-2 font-bold text-black">Sign Out</Text>
          <Ionicons name="log-out-outline" color={"black"} size={20} />
        </TouchableOpacity>
        </View>
        </ScrollView>
        <View className="absolute bottom-48 h-32 w-full z-32 bg-white">
          <MenuButtons />
        </View>
    </View>
  )
}

export default Home