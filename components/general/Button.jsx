import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InvoiceBtn = ({loading = false, duty, icon, iconColor, text, textColor = "#4847A0", classes, bg="#81F3FA"}) => {
  return (
    <View>
      <TouchableOpacity onPress={duty} className={` bg-[${bg}] rounded-[12px] flex flex-row items-center justify-center w-full p-2 my-[2px] ${classes}`}>
          <Text className={`mx-2 text-lg font-bold ${textColor}`}>{text}</Text>
          <Ionicons name={icon} color={iconColor} size={24} />
          <View>
          {loading && <ActivityIndicator 
            animating={true} 
            color={MD2Colors.white}
            className="mx-1"
            />}
          </View>
        </TouchableOpacity>
    </View>
  )
}

export default InvoiceBtn