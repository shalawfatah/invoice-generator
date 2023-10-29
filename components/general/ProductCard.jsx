import { useState } from "react";
import { Text, View } from "react-native";
import InvoiceBtn from "./Button";
import Purchases from "react-native-purchases";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({name, price, currency, item}) => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const subscribe = async(item) => {
    setLoading(true)
    try {
      const {purchaserInfo} = await Purchases.purchasePackage(item)
      setLoading(false)
      const purchase = await Purchases.getCustomerInfo()
      if(typeof purchase.entitlements.active['pro'] !== 'undefined') {
        await navigation.navigate('Account')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
    return (
      <View className="bg-white p-4 m-4 shadow-sm">
        <Text className="font-bold text-lg my-2">{name}</Text>
        <Text className="text-md my-2">Price: {price} {currency}</Text>
        <InvoiceBtn loading={loading} disabled={loading} icon={"log-in-outline"} text="Subscribe" duty={() => subscribe(item)} classes="my-2" />
      </View>
    )
  }

  export default ProductCard;