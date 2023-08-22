import React, { createContext, useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './components/account/Auth'
import { Session } from '@supabase/supabase-js'
import Navigation from './components/general/Navigation'
import { StripeProvider } from '@stripe/stripe-react-native'
import UserProp from './components/general/UserProp'

export const SessionContext = createContext(null)

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState(null)
  const [isSessionSet, setIsSessionSet] = useState(false) // Add this state

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session.user)
      setIsSessionSet(true) // Mark session as set
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session.user)
      setIsSessionSet(true) // Mark session as set
    })
  }, [])

  useEffect(() => {
    if (isSessionSet) {
      // Now, you can set the user state after the session state is set
      // This will ensure that the user state is only set after session state is available
      // Do any additional processing or rendering that involves both session and user here
    }
  }, [isSessionSet])

  return (
    <StripeProvider publishableKey='pk_test_51HhPuUK1omnuMJYrNMXx9TZgm4MhtRewC2QU8WTBBcHUTBUFshVHc3HCI7xXoPwjUC8asvr03tz9hLOWBRUXasSy00uLZxpufi'>
      <SessionContext.Provider value={user}>
        {isSessionSet && session && session.user ? <Navigation /> : <Auth />}
      </SessionContext.Provider>
    </StripeProvider>
  )
}
