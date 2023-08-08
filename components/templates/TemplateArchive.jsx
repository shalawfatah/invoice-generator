import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import PdfReader from '../general/PdfReader'

const pdfs = [
    {id: 1, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 2, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 3, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 4, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 5, source: 'https://www.africau.edu/images/default/sample.pdf'},
]
const TemplateArchive = () => {
    const navigation = useNavigation()
  return (
    <ScrollView className="bg-indigo-400">
        <View className="flex flex-row flex-wrap gap-2 justify-center items-center my-2">
        {pdfs.map(item => {
            return <TouchableOpacity key={item.id} className="w-28" onPress={() => navigation.navigate('TemplateView', {item})}>
                <Card.Cover  source={{ uri: 'https://picsum.photos/700' }} />
            </TouchableOpacity>
        })}
        </View>
    </ScrollView>
  )
}

export default TemplateArchive