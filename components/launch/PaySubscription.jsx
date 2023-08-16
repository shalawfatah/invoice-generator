import { useState } from "react";
import { Alert, View, Text } from "react-native";
import InvoiceBtn from "../general/Button";
import { useStripe } from "@stripe/stripe-react-native";

const PaySubscription = ({route}) => {
  const data = route.params;
  return (
    <View className="py-12 px-4 flex justify-center bg-white">
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

export default PaySubscription;