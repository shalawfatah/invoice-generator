import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
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
const TemplateArchive = ({route}) => {
    const data = route.params;

    const navigation = useNavigation();

    const [thumbnails, setThumbnails] = useState([])

    const invoice_fetcher = async() => {
        let { data: templates, error } = await supabase
        .from('templates')
        .select()
        setThumbnails(templates);
    }


    useEffect(() => {
        invoice_fetcher()
    }, [])

    return (
    <ScrollView>
        <View className="flex flex-row flex-wrap gap-2 justify-center items-center my-2">
        {thumbnails.map(item => {
            return <TouchableOpacity key={item.id} className=" w-40 h-auto flex justify-center" onPress={() => navigation.navigate('TemplateView', {item})}>
                <Text className="font-bold text-center py-2">{item.title}</Text>
                <Card.Cover source={{ uri: item.thumbnail }} />
            </TouchableOpacity>
        })}
        </View>
    </ScrollView>
  )
}

export default TemplateArchive