import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react'
import { BackHandler, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Color } from '../styles/Color';
import { imgAvatar } from '../assets/images';
import ThemeContext from '../components/common/ThemeContext';

export const DrawerContent = ({ props, navigation }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [exitDialogVisible, setExitDialogVisible] = useState(false);
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <DrawerContentScrollView {...props}>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={imgAvatar}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={[styles.title, { color: theme.textColor1 }]}>Sahal Sherazi</Title>
                                <Caption style={[styles.caption, { color: theme.GREY }]}>@sahilsherazi1712</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                    <View style={styles.section}>
                        <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                        <Caption style={styles.caption}>Following</Caption>
                    </View>
                    <View style={styles.section}>
                        <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                        <Caption style={styles.caption}>Followers</Caption>
                    </View>
                </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='home-outline' color={theme.GREY} size={size} />
                            )}
                            label="Home"
                            labelStyle={{ color: theme.GREY }}
                            onPress={() => { navigation.navigate("Home") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='account-outline' color={theme.GREY} size={size} />
                            )}
                            label="Profile"
                            labelStyle={{ color: theme.GREY }}
                            onPress={() => { navigation.navigate("Account") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='email-outline' color={theme.GREY} size={size} />
                            )}
                            label="Contact Us"
                            labelStyle={{ color: theme.GREY }}
                            onPress={() => { navigation.navigate("ContactUs") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='information-outline' color={theme.GREY} size={size} />
                            )}
                            label="About"
                            labelStyle={{ color: theme.GREY }}
                            onPress={() => { navigation.navigate("About") }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title='Preferences'>
                        <TouchableRipple onPress={() => {
                            toggleTheme()
                            navigation.closeDrawer();
                            console.log("theme", theme.themeId);
                        }}>
                            <View style={styles.prefereces}>
                                <Text style={{ color: theme.GREY }}>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    {/* <Switch value={theme === 'dark'} onValueChange={() => toggleTheme()} /> */}
                                    <Switch
                                        value={theme.themeId === 'dark'}
                                        onValueChange={toggleTheme}
                                        trackColor={{ true: Color.GREY, false: Color.BLUE }}
                                        thumbColor={theme.themeId === 'dark' ? '#f4f3f4' : Color.WHITE}
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name='exit-to-app' color={theme.GREY} size={size} />
                    )}
                    label="Sign Out"
                    labelStyle={{ color: theme.GREY }}
                    onPress={() => { setExitDialogVisible(true) }}
                />
            </Drawer.Section>
            <Modal visible={exitDialogVisible} animationType="fade" transparent>
                <View style={{ padding: 20, backgroundColor: "rgba(34, 89, 128, 0.7)", width: "100%", height: "100%", justifyContent: "center" }}>
                    <View style={{ backgroundColor: Color.WHITE, padding: 20, borderRadius: 20, }}>
                        <Text style={{
                            fontFamily: 'Poppin',
                            fontSize: 18,
                            color: Color.DARK_BLUE
                        }}>{'Exit'}</Text>
                        <Text style={{
                            fontFamily: 'Poppin',
                            fontSize: 14,
                            marginTop: 10,
                            lineHeight: 20,
                            color: Color.GREY
                        }}>{'Are you sure to close app!'}</Text>
                        <View style={{ flexDirection: "row", marginTop: 20, alignSelf: "flex-end", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{
                                    marginRight: 20
                                }}
                                onPress={() => setExitDialogVisible(false)}>
                                <Text style={{
                                    fontFamily: 'Poppins',
                                    fontSize: 14,
                                    color: Color.DARK_BLUE,
                                }}>{'Cancel'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: Color.DARK_BLUE, padding: 5, borderRadius: 7, }}
                                onPress={() => {
                                    setExitDialogVisible(false)
                                    BackHandler.exitApp()
                                }}>
                                <Text style={{
                                    fontFamily: 'Poppins',
                                    fontSize: 14,
                                    color: Color.WHITE,
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}>{'Exit'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: "#f4f4f4",
    },
    prefereces: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
export default DrawerContent