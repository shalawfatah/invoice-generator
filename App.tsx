
import React, {createContext, useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './components/account/Auth'
import Account from './components/account/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Navigation from './components/general/Navigation';

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
    <SessionContext.Provider value={user}>
      {session && session.user ? <Navigation /> : <Auth />}
    </SessionContext.Provider>
  )
}

/*
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
*/