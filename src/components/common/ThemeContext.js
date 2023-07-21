import React, { createContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { darkTheme, lightTheme } from '../../styles/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(()=> {
        fetchPrefernceTheme()
    },[]);

    const fetchPrefernceTheme = async () => {
        try {
          const storedTheme = await AsyncStorage.getItem('themePreference');
          setIsDarkMode(storedTheme === 'dark'); /// this line is used to get true/false
          console.log('');
        } catch (error) {
          console.log('Error retrieving theme preference from AsyncStorage:', error);
        }
      };

    const toggleTheme = async() => {
        setIsDarkMode(!isDarkMode)

        // Store the updated theme preference in AsyncStorage
        try {
            await AsyncStorage.setItem("themePreference", isDarkMode ? 'light' : 'dark')
        } catch (error) {
            console.log('Error storing theme preference in AsyncStorage:', error);
        }
    }

    const theme = isDarkMode? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// export default ThemeProvider
export default ThemeContext;


/*
To implement light mode/dark mode functionality in a React Native app, you can follow these steps:
1. Define Theme Colors
2. Set Up a Theme Context: createContext function from React. It will hold the current theme and provide a way
 to toggle between light and dark mode
3. Wrap Your App Component: Wrap your main app component with the ThemeProvider and pass the main component as 
 its child. This will make the theme context available throughout the app
4. Use Theme Context in Components: To utilize the theme context in your components, you can use the useContext
 hook provided by React
*/
