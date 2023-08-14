import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { useStripe } from '@stripe/stripe-react-native';

const Product = () => {
    const url = "https://ray-mobile-backend.onrender.com";
    const [result, setResult] = useState([])
    const stripe = useStripe()
    const product_fetcher = async() => {
        try {            
            const response = await fetch(`${url}/invoice_list`)
            const data = await response.json()
            setResult(data);
        } catch (error) {
            console.log('stripe server error', error)
        }
    }

    const subscribe = async (itemId) => {
        const data = { item_id: itemId }; 
        try {
          const response = await fetch(`${url}/invoice/subscribe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const result = await response.json()
          c
      
          // Handle the response as needed
        } catch (error) {
          console.log('subscription error', error);
        }
      };
      

    useEffect(() => {
        product_fetcher()
    }, [])

  return (
    <View>
        {result?.price?.data?.map(item => {
            console.log('i ', item.id)
            return <View key={item.id}>
                        <ProductCard 
                            name={"Pro Plan"}
                            price={`$${item.unit_amount / 100}`}
                            subscribe={() => subscribe(item.id)}
                            />
                    </View>
        })}
    </View>
  )
}

export default Product