import { Provider } from 'jotai'
import Main from './pages/Main'
import * as Updates from "expo-updates"
import { useEffect } from 'react';

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])
  return (
    <Provider>
      <Main />
    </Provider>
  )
}
