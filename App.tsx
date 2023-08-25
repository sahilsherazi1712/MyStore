import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persister, store } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/components/common/ThemeContext';
import { TourGuideProvider } from 'rn-tourguide';

const App = () => {
  return (
    <TourGuideProvider {...{borderRadius: 16,}} preventOutsideInteraction={true} androidStatusBarVisible={true}>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persister}>
            <AppNavigator />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </TourGuideProvider>
  )
}

const styles = StyleSheet.create({})
export default App