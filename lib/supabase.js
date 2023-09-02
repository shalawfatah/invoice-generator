import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const AsyncStorageAdapter = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
    }
  },
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  },
};

// Rest of your code remains unchanged
const supabaseUrl = "https://bkcsaqsiloxvfsnhymgk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrY3NhcXNpbG94dmZzbmh5bWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1MzEzOTgsImV4cCI6MjAwNzEwNzM5OH0.a-_gz15hvU9vYxD0NUfS23Efbx9i8r_w6raffKQ20Ug";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorageAdapter, // Use the AsyncStorageAdapter
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});