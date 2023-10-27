import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { supabase } from '../lib/supabase'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors, Surface } from 'react-native-paper';
import { SessionContext } from '../components/general/SessionContext';
import Purchases from 'react-native-purchases';

const Home = () => {
      const user = useContext(SessionContext);
      const [profile, setProfile] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [loading, setLoading] = useState(false);
      const [active, setActive] = useState([])

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

      const navigation = useNavigation();

      const signout = async () => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
      };

      const edit_user = () => {
        navigation.navigate('EditProfile', { user });
      };

      const subscribe = async() => {
        await navigation.navigate('Subscribe Packages')
      }

      const check_subscription = async() => {
        try {
          const customerInfo = await Purchases.getCustomerInfo();
          setActive(customerInfo.activeSubscriptions)
        } catch (e) {
         console.log(e)
        }
      }

      useEffect(() => {
        check_subscription()
      }, [])

      const delete_all = async() => {
        await supabase.from('profile').delete().eq('user_id', user?.id)
        await supabase.auth.admin.deleteUser(user?.id)
        await signout()
        }

        const delete_everything = () => {
          Alert.alert('Delete Everything?', 'This will remove your subscription, account, invoices, estimates, everything else!', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => delete_all()},
          ]);
        }

  return (
    <View className="bg-white min-h-screen relative">
      <ScrollView>
      <View className="p-2 flex flex-row justify-around py-6">
        <TouchableOpacity onPress={() => navigation.navigate('Client Archive')}>
        <Surface elevation={4} className="py-2 w-24 flex flex-col justify-center items-center rounded-md">
          <Text className="py-2 font-bold">Clients</Text>
          <Ionicons name="business-outline" size={24} color={"black"}/>
        </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Templates')}>
        <Surface elevation={4} className="py-2 w-24 flex flex-col justify-center  items-center rounded-md">
          <Text className="font-bold py-2">Templates</Text>
          <Ionicons name="newspaper-outline" size={24} color={"black"}/>
        </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Report')}>
        <Surface elevation={4} className="py-2 w-24 flex flex-col justify-center items-center rounded-md">
          <Text className="font-bold py-2">Reports</Text>
          <Ionicons name="bar-chart-outline" size={24} color={"black"}/>
        </Surface>
        </TouchableOpacity>
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
    <View className="flex w-screen items-center bg-white p-2">
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
        <Text className="text-md p-1">Subscription Status:</Text>
        {active.length > 0 ? <View className={`flex flex-row gap-x-2 items-center pr-4 `}>
          <Ionicons name="play-circle-outline" size={24} color={"black"}/>
          <Text className="text-black">Active</Text>
          </View> :
          <View className={`flex flex-row gap-x-2 items-center pr-4 `}>
           <Ionicons name="stop-circle-outline" size={24} color={"black"}/>
          <Text className="text-black ">Inactive</Text>
        </View>}
      </View>
        <Divider className="w-full my-2 bg-gray-400" />
      {active.length > 0 ? <Text></Text> : <TouchableOpacity onPress={subscribe} className=" bg-[#09A144] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 font-bold text-lg text-white">Subscribe</Text>
          <Ionicons name="chevron-forward-circle-outline" color={"white"} size={24} />
      </TouchableOpacity>}
      <TouchableOpacity onPress={edit_user} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 text-lg font-bold text-black">Update Profile</Text>
          <Ionicons name="create-outline" color={"black"} size={24} />
        </TouchableOpacity>
        <Divider className="w-full my-2 mt-6 bg-gray-400" />
        <Text className="text-[#DC143C]"> ... Danger Zone ...</Text>
        <Divider className="w-full my-2 bg-gray-400" />
        <TouchableOpacity onPress={delete_everything} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 ">
          <Text className="mx-2 text-lg font-bold text-white">Delete Everything</Text>
          <Ionicons name="trash-bin-outline" color={"white"} size={24} />
        </TouchableOpacity>
    </View>
        
        </View> )}
        <View className="px-2 ">
        <TouchableOpacity onPress={signout} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2">
          <Text className="mx-2 text-lg font-bold text-black">Sign Out</Text>
          <Ionicons name="log-out-outline" color={"black"} size={24} />
        </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  )
}

export default Home