import { useContext, useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import InvoiceBtn from "../general/Button";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { SessionContext } from "../../App";
import { supabase } from "../../lib/supabase";

const PaySubscription = ({route}) => {

  const data = route.params;

  const session = useContext(SessionContext)
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null)

  const find_profile = async() => {
    const {data, error} = await supabase.from('profile').select().eq('email', session.email)
    setProfile(data[0])
    if(profile !== null) {
      await update_user()
    }
  }
  const update_user = async() => {
    const { data, error } = await supabase.auth.updateUser({
      data: { 
        name: profile.name, 
        price: profile.price,
        stripe_customer_id: profile.stripe_customer_id,
        subscription_status: profile.subscription_status
      }
    })
  }

  useEffect(() => {
    find_profile()
  }, [])

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