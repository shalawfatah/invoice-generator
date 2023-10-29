import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { decode } from 'base64-arraybuffer'
import { useAtom } from 'jotai';
import { sessionAtom } from '../../lib/store';

const CompanyLogo = () => {
  const [session] = useAtom(sessionAtom);
  const [image, setImage] = useState(null)
  const [imgName, setImgName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState('')
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    setLoading(true)
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });    
      if (!result.canceled) {
            setImage(result.assets[0].uri);
            const body = new FormData();
            const regex = /ImagePicker\/(.*)/;
            const res = result.assets[0].uri.match(regex)[1];
            let newName = Date.now() + res;
            setImgName(newName)
   
            body.append('upload', {
              uri: result.assets[0].uri,
              name: newName,
              type: result.assets[0].type,
            });

            setPhoto(body)
            const { data, error } = await supabase
            .storage
            .from('avatars')
            .upload(newName, decode('base64FileData'), {
              contentType: 'image/*'
            })
            const url = 'https://bkcsaqsiloxvfsnhymgk.supabase.co/storage/v1/object/public/avatars/' + newName;
            setPhotoURL(url)
            if(error) {
              console.log(error)
            } else {
              setLoading(false)
            }
      }
    };

    const uploadLogo = async() => {
      setLoading(true)
      const {data, error} = await supabase.from('assets').insert({url: photoURL})
      if(error) {
        console.log(error)
      }
    }
  return (
    <View className="mx-4">
      <View className="my-2 mx-12">
      <Text className="text-center text-xs text-gray-800 my-2">Tap the icon upload your company's logo. This will appear on your estimates and invoices</Text>
        <TouchableOpacity className="my-2 py-2 border-[2px] border-gray-700 rounded-lg bg-gray-100" onPress={pickImage}>
            <Ionicons style={{textAlign: 'center'}}  name="image" size={48} color={"#2b3252"} />
        </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      </View>
      <TouchableOpacity onPress={uploadLogo} className=" bg-indigo-100 rounded-[12px] flex flex-row items-center justify-center w-full p-2">
          <Text className="mx-2 font-bold text-black">Upload Logo</Text>
          <Ionicons name="image-outline" color={"black"} size={20} />
        </TouchableOpacity>
    </View>
  )
}

export default CompanyLogo