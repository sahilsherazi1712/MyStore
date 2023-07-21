// theme.js

import { Color } from "./Color";

export const lightTheme = {
    themeId: 'dark',
    primaryColor: Color.WHITE,
    backgroundColor: Color.OFF_WHITE,
    textColor: Color.WHITE,
    textColor1: Color.BLACK,
    statusBarColor: Color.DARK_BLUE,
    headerBgColor: Color.BLUE,
    categorybgColor: Color.LIGHT_BLUE,
    GREY: Color.GREY,
    btnColor: Color.DARK_BLUE,
    // Add more color variables for light mode
};

export const darkTheme = {
    themeId: 'light',
    primaryColor: Color.BLACK,
    backgroundColor: Color.OFF_BLACK,
    textColor: Color.BLACK,
    textColor1: Color.WHITE,
    statusBarColor: Color.BLACK,
    headerBgColor: Color.BLACK,
    categorybgColor: Color.OFF_WHITE,
    GREY: Color.GREY_LIGHT,
    btnColor: Color.OFF_WHITE,
    // Add more color variables for dark mode
};