import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { supabase } from "../lib/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import Purchases from "react-native-purchases";
import { useAtom } from "jotai";
import Details from "../components/account/Details";
import PageIcon from "../components/account/PageIcon";
import InvoiceBtn from "../components/general/Button";

const Home = () => {
  const [user] = useAtom(userAtom);
  const [active, setActive] = useState([]);

  const navigation = useNavigation();

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const edit_user = () => {
    navigation.navigate("EditProfile", { user });
  };

  const subscribe = () => {
    navigation.navigate("Subscribe Packages");
  };

  const check_subscription = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setActive(customerInfo.activeSubscriptions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    check_subscription();
  }, [active]);

  const delete_all = async () => {
    const { error } = await supabase
      .from("profile")
      .delete()
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
    }
    await supabase.auth.admin.deleteUser(user.id);
    await signout();
  };

  const delete_everything = () => {
    Alert.alert(
      "Delete Everything?",
      "This will remove your subscription, account, invoices, estimates, everything else!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => delete_all() },
      ],
    );
  };

  return (
    <View className="bg-white min-h-screen relative">
      <ScrollView>
        <View className="p-2 flex flex-row justify-around py-6">
          <PageIcon
            icon={"business-outline"}
            text={"Clients"}
            duty={() => navigation.navigate("Client Archive")}
          />
          <PageIcon
            icon={"newspaper-outline"}
            text={"Templates"}
            duty={() => navigation.navigate("Templates")}
          />
          <PageIcon
            icon={"bar-chart-outline"}
            text={"Reports"}
            duty={() => navigation.navigate("Report")}
          />
        </View>
        <Divider />
        <View>
          <View className="flex w-screen items-center bg-white p-2">
            <Details />
            <View className="flex flex-row items-center justify-between my-1 border-gray-200 w-full">
              <Text className="text-md p-1">Subscription Status:</Text>
              {active.length > 0 ? (
                <View className={`flex flex-row gap-x-2 items-center pr-4 `}>
                  <Ionicons
                    name="play-circle-outline"
                    size={24}
                    color={"black"}
                  />
                  <Text className="text-black">Active</Text>
                </View>
              ) : (
                <View className={`flex flex-row gap-x-2 items-center pr-4 `}>
                  <Ionicons
                    name="stop-circle-outline"
                    size={24}
                    color={"#E0115F"}
                  />
                  <Text className="text-[#E0115F] ">Inactive</Text>
                </View>
              )}
            </View>
            <Divider className="w-full my-2 bg-gray-400" />
            {active.length > 0 ? null : (
              <View className="w-full">
                <InvoiceBtn
                  classes={"bg-[#33BB64]"}
                  textColor={"text-white"}
                  iconColor={"white"}
                  text="Subscribe"
                  icon="chevron-forward-circle-outline"
                  duty={subscribe}
                />
              </View>
            )}
            <View className="w-full">
              <InvoiceBtn
                text="Update Profile"
                icon="create-outline"
                duty={edit_user}
              />
            </View>
            <Divider className="w-full my-2 bg-gray-400" />
            <Text className="text-[#E0115F] font-bold">
              {" "}
              ... Danger Zone ...
            </Text>
            <Divider className="w-full my-2 bg-gray-400" />
            <View className="w-full">
              <InvoiceBtn
                text="Delete Everything"
                icon="trash-bin-outline"
                duty={delete_everything}
                textColor={"text-white"}
                iconColor={"white"}
                classes={"bg-[#E0115F]"}
              />
            </View>
            <View className="w-full">
              <InvoiceBtn
                text="Sign Out"
                icon="log-out-outline"
                duty={signout}
                textColor={"text-white"}
                iconColor={"white"}
                classes={"bg-[#E0115F]"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
