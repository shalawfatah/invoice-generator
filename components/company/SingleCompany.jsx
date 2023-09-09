import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SingleCompany = ({name, email, delete_client, update_client}) => {
  return (
    <View className="flex flex-row justify-between p-2 bg-white shadow-sm shadow-gray-400 m-1 rounded-md px-4">
        <View>
            <Text className="font-bold text-lg">{name}</Text>
            <Text className="text-gray-400">{email}</Text>
        </View>
        <View className="flex flex-row items-center gap-x-2">
            <TouchableOpacity onPress={update_client}>
                <Ionicons style={{textAlign: 'center'}}  name="create" size={24} color={"#3B82F6"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={delete_client}>
                <Ionicons style={{textAlign: 'center'}}  name="trash" size={24} color={"#EF4444"} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SingleCompany