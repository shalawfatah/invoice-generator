import React, { useState } from 'react'
import { Button } from 'react-native-paper';

const InvoiceBtn = ({duty, icon, mode = "contained", text, textColor = "#4847A0", buttonColor = "#81F3FA", classes}) => {
  return (
    <Button 
      buttonColor={buttonColor}
      textColor={textColor}
      icon={icon} 
      mode={mode} 
      onPress={duty} 
      className={`w-full ${classes}`}
      >
        {text}
    </Button>
  )
}

export default InvoiceBtn