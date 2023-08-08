import React, { useState } from 'react'
import { Button } from 'react-native-paper';

const InvoiceBtn = ({duty, icon, mode, text}) => {
  return (
    <Button 
      buttonColor="#81F3FA"
      textColor="#4847A0"
      icon={icon} 
      mode={mode} 
      onPress={duty} className="w-full"
      >
        {text}
    </Button>
  )
}

export default InvoiceBtn