import React, { useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { sessionAtom, userAtom } from '../lib/store'
import { supabase } from '../lib/supabase';
import Navigation from '../components/general/Navigation';
import Auth from '../components/account/Auth';
import { useAtom } from 'jotai';


export default function Main() {
    const [session, setSession] = useAtom(sessionAtom);
    const [user, setUser] = useAtom(userAtom);
  
    const get_session = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('session error', error);
        } else {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('catch session ', error);
      }
    }
  
    const session_change = (newSession) => {
      if (newSession) {
        setUser(newSession.user);
      } else {
        setUser(null);
      }
    }
  
    useEffect(() => {
      // Fetch the initial session
      get_session();
  
      // Add an event listener for auth state changes
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        session_change(session);
      });
    }, []);

  return (
        user !== null ? <Navigation /> : <Auth />
  )
}