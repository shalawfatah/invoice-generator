import React, { useState } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const InvoiceBtn = ({loading = false, duty, icon, mode = "contained", text, textColor = "#4847A0", buttonColor = "#81F3FA", classes}) => {
  return (
    <View>
      <Button 
        buttonColor={buttonColor}
        textColor={textColor}
        icon={icon} 
        mode={mode} 
        onPress={duty}
        className={`w-full ${classes}`}
        >
          {text}
          <View>
        {loading && <ActivityIndicator 
          animating={true} 
          color={MD2Colors.white}
          className="mx-1"
          />}
          </View>
      </Button>
    </View>
  )
}

export default InvoiceBtn