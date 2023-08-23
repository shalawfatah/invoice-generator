import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-row gap-x-2 items-center p-2 dfe7ff rounded-[12px] bg-[#dfe7ff] border-[1px] border-[#2b3252] m-[2px]">
        <Ionicons name={icon} color={"black"} size={16} />
        <Text className="text-xs">{text}</Text>
    </TouchableOpacity>
  )
}

export default Item