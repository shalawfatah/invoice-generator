
import React, {createContext, useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './components/account/Auth'
import { Session } from '@supabase/supabase-js'
import Navigation from './components/general/Navigation';
import { StripeProvider } from '@stripe/stripe-react-native';

export const SessionContext = createContext(null);

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session.user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session.user)
    })
  }, [])

  return (
    <StripeProvider publishableKey='pk_test_51HhPuUK1omnuMJYrNMXx9TZgm4MhtRewC2QU8WTBBcHUTBUFshVHc3HCI7xXoPwjUC8asvr03tz9hLOWBRUXasSy00uLZxpufi'>
      <SessionContext.Provider value={user}>
        {session && session.user ? <Navigation /> : <Auth />}
      </SessionContext.Provider>
    </StripeProvider>
  )
}

/*
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
*/