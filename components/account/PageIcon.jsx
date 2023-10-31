import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';

const PageIcon = ({duty, text, icon}) => {
  return (
    <TouchableOpacity onPress={duty}>
    <Surface elevation={4} className="py-2 w-24 flex flex-col justify-center items-center rounded-md">
      <Text className="py-2 font-bold">{text}</Text>
      <Ionicons name={icon} size={24} color={"black"}/>
    </Surface>
    </TouchableOpacity>
  )
}

export default PageIcon