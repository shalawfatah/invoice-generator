import React, { createContext, useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './components/account/Auth'
import { Session } from '@supabase/supabase-js'
import Navigation from './components/general/Navigation'
import { StripeProvider } from '@stripe/stripe-react-native'
import { SessionContext } from './components/general/SessionContext'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<object | null>(null)
  const [isSessionSet, setIsSessionSet] = useState(false) // Add this state

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setUser(session.user);
        setIsSessionSet(true); // Mark session as set
      } else {
        setUser(null); // Clear user if session is not available
        setIsSessionSet(false); // Mark session as not set
      }
    });
  
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUser(session.user);
        setIsSessionSet(true); // Mark session as set
      } else {
        setUser(null); // Clear user if session is not available
        setIsSessionSet(false); // Mark session as not set
      }
    });
  }, []);
  

  return (
    <StripeProvider publishableKey='pk_test_51HhPuUK1omnuMJYrNMXx9TZgm4MhtRewC2QU8WTBBcHUTBUFshVHc3HCI7xXoPwjUC8asvr03tz9hLOWBRUXasSy00uLZxpufi'>
      <SessionContext.Provider value={user}>
        {isSessionSet && session && session.user ? <Navigation /> : <Auth />}
      </SessionContext.Provider>
    </StripeProvider>
  )
}
