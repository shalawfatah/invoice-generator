import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';

const InvoiceInput = ({placeholder, label, mode}) => {
    const [text, setText] = useState('')
  return (
      <TextInput
          mode={mode}
          label={label}
          placeholder={placeholder}
          value={text}
          className="w-full"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: '#D3D3D3'} }}
          />
  )
}

export default InvoiceInput