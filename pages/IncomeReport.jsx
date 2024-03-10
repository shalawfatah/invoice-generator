import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import MenuButtons from "../components/general/MenuButtons";
import { useAtom } from "jotai";
import { userAtom } from "../lib/store";

const IncomeReport = () => {
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  const [isIos, setIsIos] = useState(false);

  const checkUser = () => {
    if (user !== null) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    setIsIos(Platform.OS === "ios");
  }, []);

  return (
    <View className="h-screen relative">
      <ScrollView className="bg-white">
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.black}
            className="mx-1 p-8"
          />
        ) : (
          <View>
            <ScrollView>
              <View className="p-2">
                <Text className="text-center text-md my-2">
                  Reports and Charts will be available about your income soon
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <View
        className={`absolute ${isIos ? "bottom-48" : "bottom-28"} h-32 w-full z-3`}
      >
        <MenuButtons />
      </View>
    </View>
  );
};

export default IncomeReport;
