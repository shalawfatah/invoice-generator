import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import InvoiceBtn from '../general/Button'
import { useNavigation } from '@react-navigation/native'
import Purchases from 'react-native-purchases'

const ProductCard = ({name, price, currency, subscribe}) => {
  return (
    <View className="bg-white p-4 m-4 shadow-sm">
      <Text className="font-bold text-lg my-2">{name}</Text>
      <Text className="text-md my-2">Price: {price} {currency}</Text>
      <InvoiceBtn icon={"log-in-outline"} text="Subscribe" duty={subscribe} classes="my-2" />
    </View>
  )
}

const SubscribePackages = () => {

  const [packages, setPackages] = useState([]);
  const navigation = useNavigation();

  const fetch_prices = async() => {
    const result = await Purchases.getOfferings()
    setPackages(result)
  }

  const subscribe = async(item) => {
    try {
      const {purchaserInfo} = await Purchases.purchasePackage(item)
      const purchase = await Purchases.getCustomerInfo()
      console.log('purchase: ', purchase)
      if(typeof purchase.entitlements.active['pro'] !== 'undefined') {
        await navigation.navigate('Account')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_prices()
  }, [])
  
  return (
    <View>
      {packages.current?.availablePackages?.map((item) => {
        return <View key={item.identifier}>
                  <ProductCard 
                      name={item.packageType} 
                      price={item.product.priceString}
                      currency={item.product.currencyCode}
                      subscribe={() => subscribe(item)} 
                  />
              </View>
      })}
    </View>
  )
}

export default SubscribePackages