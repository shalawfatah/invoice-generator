import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView, Platform, Linking } from 'react-native'
import { supabase } from '../lib/supabase'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Checking from '../components/account/Checking';
import { Divider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors, Surface } from 'react-native-paper';
import MenuButtons from '../components/general/MenuButtons';
import { SessionContext } from '../components/general/SessionContext';
import { signOutFunc } from '../util_functions/signOutFunc';

const Home = () => {
      const user = useContext(SessionContext);
      const [profile, setProfile] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const API_URL = "https://ray-mobile-backend.onrender.com";
      const [loading, setLoading] = useState(false);
      
      const [isIos, setIsIos] = useState(false);

      useEffect(() => {
        setIsIos(Platform.OS === 'ios');
      }, []);

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
        const response = await fetch(`${API_URL}/delete-subscription`);
        if (!response.ok) return Alert.alert(response);
        const result = await response.json();
        await signOutFunc()
      };

      const subscription_trigger = () => {
        Alert.alert('Stop Subscription', 'Do you really want to stop subscribing to Invoice Generator?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => stop_subscription()},
        ]);
      }
      const stop_subscription = async() => {
        setLoading(true)
        const response = await fetch(`${API_URL}/cancel-subscription-invoice`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: profile.stripe_customer_id
            }),
        })
        const result = await response.json()
        if(error) {
          console.log(error)
          setLoading(false)
          return;
        } else {
          await signOutFunc()
          setLoading(false)
        }
      }

      const reactivate_subscription = async() => {
        setLoading(true)
        const response = await fetch(`${API_URL}/reactivate-subscription`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: profile.stripe_customer_id
            }),
        })
        const result = await response.json()
        if(error) {
          console.log(error)
          return;
        } else {
          console.log(result)
        }
        setLoading(false)
      }

      const delete_all = async() => {
        await delete_user()
        await supabase.from('profile').delete().eq('user_id', user?.id)
        await supabase.auth.admin.deleteUser(user?.id)
        await signOutFunc()
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

        // const manage_account = () => {
        //   Linking.openURL(`https://manage-invoice-generator.netlify.app?stripeId=${profile.stripe_customer_id}`)
        // }

  return (
    <View className="bg-white min-h-screen relative">
      <View className="p-2 flex flex-row justify-around py-6">
        <TouchableOpacity onPress={() => navigation.navigate('Client Archive')}>
        <Surface elevation={4} className="h-24 w-24 flex flex-row justify-center items-center rounded-md">
          <Text className="font-bold">Clients</Text>
        </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Templates')}>
        <Surface elevation={4} className="h-24 w-24 flex flex-row justify-center items-center rounded-md">
          <Text className="font-bold">Templates</Text>
        </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Report')}>
        <Surface elevation={4} className="h-24 w-24 flex flex-row justify-center items-center rounded-md">
          <Text className="font-bold">Reports</Text>
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
      {stripeId === null || stripeId === 'undefined' ? (<Checking />) :  (
    <View className="flex w-screen items-center bg-white p-2">
      <Text className="text-lg font-bold  w-full text-center py-1">Company Profile</Text>
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
          {status !== null ? <Ionicons name="play-circle-outline" size={24} color={"white"}/> : <Ionicons name="stop-circle-outline" size={24} color={"white"}/>}
          {status !== null ? <Text className="text-white font-bold">{profile?.subscription_status}</Text> : <Text className="text-white font-bold">Inactive</Text>}
        </View>
      </View>
        <Divider className="w-full my-2 bg-gray-400" />   
{(status === 'canceled') ? <TouchableOpacity onPress={reactivate_subscription} className=" bg-[#09A144] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 font-bold text-white">Activate Subscription</Text>
          <Ionicons name="create-outline" color={"white"} size={24} />
        </TouchableOpacity> : <Text></Text>}
      <TouchableOpacity onPress={edit_user} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 text-lg font-bold text-black">Update Profile</Text>
          <Ionicons name="create-outline" color={"black"} size={24} />
        </TouchableOpacity>
{status === 'active' ?        <TouchableOpacity onPress={subscription_trigger} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 text-lg font-bold text-white">Cancel Subscription</Text>
          <Ionicons name="pause" color={"white"} size={24} />
        </TouchableOpacity> : <Text></Text>}
        <TouchableOpacity onPress={delete_everything} className=" bg-[#DC143C] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px]">
          <Text className="mx-2 text-lg font-bold text-white">Delete Everything</Text>
          <Ionicons name="trash-bin-outline" color={"white"} size={24} />
        </TouchableOpacity>
    </View>
        )}
        </View> )}
        <View className="px-2 ">
        <TouchableOpacity onPress={signout} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2">
          <Text className="mx-2 text-lg font-bold text-black">Sign Out</Text>
          <Ionicons name="log-out-outline" color={"black"} size={24} />
        </TouchableOpacity>
        </View>
        <View className={`absolute ${isIos ? 'bottom-40' : 'bottom-28'} h-32 w-full z-3`}>
          <MenuButtons />
        </View>
    </View>
  )
}

export default Home