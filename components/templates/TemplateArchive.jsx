import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const pdfs = [
    {id: 1, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 2, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 3, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 4, source: 'https://www.africau.edu/images/default/sample.pdf'},
    {id: 5, source: 'https://www.africau.edu/images/default/sample.pdf'},
]
const TemplateArchive = () => {
    const [thumbnails, setThumbnails] = useState([])

    const invoice_fetcher = async() => {
        let { data: templates, error } = await supabase
        .from('templates')
        .select()
        setThumbnails(templates);
    }

    const navigation = useNavigation()

    useEffect(() => {
        invoice_fetcher()
    }, [])
    console.log(thumbnails);
  return (
    <ScrollView className="bg-indigo-400">
        <View className="flex flex-row flex-wrap gap-2 justify-center items-center my-2">
        {thumbnails.map(item => {
            return <TouchableOpacity key={item.id} className="w-28" onPress={() => navigation.navigate('TemplateView', {item})}>
                <Card.Cover  source={{ uri: item.thumbnail }} />
            </TouchableOpacity>
        })}
        </View>
    </ScrollView>
  )
}

export default TemplateArchive