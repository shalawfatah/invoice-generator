import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import InvoiceBtn from "../components/general/Button";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { useAtom } from "jotai";
import { sessionAtom } from "../lib/store";

const EditProfile = () => {
  const [session] = useAtom(sessionAtom);
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

  const updateUser = async () => {
    setReload(true);
    if (session !== null) {
      const { data, error } = await supabase.auth.updateUser({
        data: { company, address },
      });
      if (error) {
        console.log(error);
        setReload(false);
      } else {
        setReload(false);
        navigation.navigate("Account");
      }
    }
  };

  return (
    <View className="bg-white p-2">
      <View>
        <TextInput
          mode={"outlined"}
          label={"Company Name"}
          placeholder={"Write your compmany name"}
          value={company}
          onChangeText={(company) => setCompany(company)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: "#D3D3D3" } }}
        />
      </View>
      <View>
        <TextInput
          mode={"outlined"}
          label={"Company Address"}
          placeholder={"Write your compmany address"}
          value={address}
          onChangeText={(address) => setAddress(address)}
          disabled={loading}
          className="w-full my-2"
          outlineColor="#81F3FA"
          theme={{ colors: { onSurfaceVariant: "#D3D3D3" } }}
        />
      </View>
      <View>
        <InvoiceBtn
          textColor="#FFF"
          icon="person-circle-outline"
          classes="my-2"
          text="Sign Up"
          duty={updateUser}
          loading={reload}
        />
      </View>
      <View></View>
    </View>
  );
};

export default EditProfile;
