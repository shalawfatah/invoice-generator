import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform, Text } from "react-native";
import { supabase } from "../lib/supabase";
import InvoiceItem from "../components/invoice/InvoiceItem";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import MenuButtons from "../components/general/MenuButtons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useAtom } from "jotai";
import { estimateTriggerAtom, userAtom } from "../lib/store";

const EstimateArchive = () => {
  const [user] = useAtom(userAtom);
  const [invoice, setInvoice] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [estimateTrigger, setEstimateTrigger] = useAtom(estimateTriggerAtom);

  const fetch_invoices = async () => {
    setIsLoading(true);
    let { data: invoices, error } = await supabase
      .from("invoices")
      .select('*, companies("*")')
      .eq("user_id", user.id)
      .eq("type", "estimate");
    if (error) {
      console.log(error);
      setIsLoading(false);
    } else {
      setInvoice(invoices);
      setIsLoading(false);
    }
  };

  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    setIsIos(Platform.OS === "ios");
  }, []);

  useEffect(() => {
    fetch_invoices();
  }, [estimateTrigger]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.black}
          className="mx-1 p-8"
        />
      ) : (
        <View>
          <View className="h-screen relative">
            <ScrollView className="bg-white py-1">
              {invoice.length > 0 ? (
                invoice.map((item) => {
                  const time = format(
                    new Date(item?.created_at),
                    "dd MMMM yyyy 'at' HH:mm aa",
                  );
                  return (
                    <View key={item.id} className="mx-2">
                      <InvoiceItem
                        company={item.companies?.company_name}
                        date={time}
                        total={item.total}
                        link={() =>
                          navigation.navigate("SingleInvoice", { item })
                        }
                      />
                    </View>
                  );
                })
              ) : (
                <Text className="text-center my-2">No estimates</Text>
              )}
            </ScrollView>
            <View
              className={`absolute ${isIos ? "bottom-48" : "bottom-28"} h-32 w-full z-3`}
            >
              <MenuButtons />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default EstimateArchive;
