import { View, Text } from 'react-native'
import React from 'react'

const CompanyLogo = () => {
  return (
    <View className="my-2 mx-auto">
    <Text className="text-xs text-gray-400">Tap the icon upload Profile Picture</Text>
      <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
          <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
      </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
    </View>
  )
}

export default CompanyLogo