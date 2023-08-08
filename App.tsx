
// export default function App() {
  //   return (
    //     <Navigation />
    //   );
    // }
    
    import React, { useState, useEffect } from 'react'
    import 'react-native-url-polyfill/auto'
    import { supabase } from './lib/supabase'
    import Auth from './components/account/Auth'
    import Account from './components/account/Account'
    import { View } from 'react-native'
    import { Session } from '@supabase/supabase-js'
    import Navigation from './components/general/Navigation';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {session && session.user ? <Navigation /> : <Auth />}
    </>
  )
}

/*
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
*/