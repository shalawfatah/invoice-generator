import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../App';
import Checking from '../components/account/Checking';

const IncomeReport = () => {
  const user = useContext(SessionContext);
  const [status, setStatus] = useState(null)
  useEffect(() => {
    setStatus(user?.user_metadata?.subscription_status)
  }, [user])
  return (
    <View>
      {status !== 'active' ? (<Checking />) :  (
        <Text>hello</Text>
      )}
    </View>
  )
}

export default IncomeReport