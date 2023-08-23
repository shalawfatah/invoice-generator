import { View } from "react-native";
import InvoiceBtn from "../general/Button";

const PaySubscription = ({route}) => {

  return (
    <View className="py-12 px-4 flex justify-center bg-white">
      <InvoiceBtn 
          text="Back"
          icon={"arrow-back-circle-outline"}
          duty={() => navigation.navigate('Templates')}
          />
    </View>
  );
}

export default PaySubscription;