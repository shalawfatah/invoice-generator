import React, { useState } from 'react'
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

const InvoiceInput = ({placeholder, label, mode}) => {
    const [text, setText] = useState('')
  return (
      <TextInput
          mode={mode}
          label={label}
          placeholder={placeholder}
          text={text}
          className="w-full"
          />
  )
}

export default InvoiceInput