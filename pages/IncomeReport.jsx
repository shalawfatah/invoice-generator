import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../App';
import Checking from '../components/account/Checking';

const IncomeReport = () => {
  const user = useContext(SessionContext);
  const [stripeId, setStripeId] = useState(null)
  useEffect(() => {
    setStripeId(user?.user_metadata?.stripe_customer_id)
  }, [user])
  return (
    <View>
      {stripeId === null || stripeId === 'undefined' ? (<Checking />) :  (
      <View>
        <Text>IncomeReport</Text>
      </View>
      )}
    </View>
  )
}

export default IncomeReport