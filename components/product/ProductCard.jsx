// import { View, Text } from 'react-native'
// import React from 'react'
// import InvoiceBtn from '../general/Button'

import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, View, Button } from "react-native";

// const ProductCard = ({name, price, subscribe}) => {
//   return (
//     <View className="bg-white p-4 m-4 shadow-sm">
//       <Text className="font-bold text-lg my-2">{name}</Text>
//       <Text className="text-md my-2">Price: {price} per month</Text>
//       <InvoiceBtn text="Subscribe" duty={subscribe} classes="my-2" />
//     </View>
//   )
// }

// export default ProductCard

const CheckoutScreen = ({id, amount, email}) => {
  const API_URL = "https://ray-mobile-backend.onrender.com";
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id, amount: amount, email: email
      })
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}

export default CheckoutScreen;