import React, { useState } from 'react'
import { Button } from 'react-native-paper';

const InvoiceBtn = ({duty, icon, mode}) => {
    const [text, setText] = useState('Register')
  return (
    <Button icon={icon} mode={mode} onPress={duty} className="w-full">
        {text}
    </Button>
  )
}

export default InvoiceBtn