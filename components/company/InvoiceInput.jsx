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
          outlineColor="#D3D3D3"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
  )
}

export default InvoiceInput