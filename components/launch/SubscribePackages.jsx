import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Purchases from 'react-native-purchases'
import ProductCard from '../general/ProductCard'



const SubscribePackages = () => {

  const [packages, setPackages] = useState([]);

  const fetch_prices = async() => {
    try {
      const result = await Purchases.getOfferings()
      setPackages(result.current.availablePackages)
    } catch (error) {
      console.log('revcat fetch ', error)
    }
  }

  useEffect(() => {
    fetch_prices()
  }, [])
  
  return (
    <View>
      <Text className="mx-4 mt-4 font-medium text-gray-700 text-center">
        With subscription, you can share your invoices, estimates, PTOs, and check reports about your income when available
        </Text>
      {packages.map((item) => {
        return <View key={item.identifier}>
                  <ProductCard 
                      name={item.packageType} 
                      price={item.product.priceString}
                      currency={item.product.currencyCode}
                      item={item}
                  />
              </View>
      })}
    </View>
  )
}

export default SubscribePackages