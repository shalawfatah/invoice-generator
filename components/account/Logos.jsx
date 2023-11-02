import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai';
import { logoTriggerAtom, userAtom } from '../../lib/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../lib/supabase';

const Logos = ({filtered_imgs}) => {
    const [user] = useAtom(userAtom)
    const url = 'https://bkcsaqsiloxvfsnhymgk.supabase.co/storage/v1/object/public/avatars/';
    const [logoTrigger, setLogoTrigger] = useAtom(logoTriggerAtom)
    const removeImg = async(item) => {
        const { data, error } = await supabase
        .storage
        .from('avatars')
        .remove([`${user.id}/${item.name}`])
        if(error) {
          console.log(error)
        } else {
            setLogoTrigger(prev => !prev)
        }
      }

  return (
    <View className="flex flex-col items-start ">
    {filtered_imgs.map(item => {
      const itemName = url + user.id + '/' + item.name;
        return <View key={item.id} className="flex flex-row items-center justify-between w-full">
                  <Image source={{ uri: itemName }} style={{ width: 70, height: 70 }} />
                  <TouchableOpacity onPress={() => removeImg(item)} className="bg-indigo-600 text-white p-3 rounded-full">
                    <Ionicons className=" " name="trash-outline" color={"white"} size={28} />
                  </TouchableOpacity>
              </View>   
    })}
    </View>
  )
}

export default Logos