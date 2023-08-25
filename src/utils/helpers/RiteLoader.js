import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { gifLoader } from '../../assets/gifs';
import AnimatedLottieView from 'lottie-react-native'
import { Color } from '../../styles/Color';
import ThemeContext from '../../components/common/ThemeContext';

const RiteLoader = ({ modalVisible, setModalVisible, loaderMsg }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: theme.primaryColor, shadowColor: theme.textColor1, }]}>
                        <AnimatedLottieView
                            source={gifLoader}
                            autoPlay
                            loop={true}
                            style={{ height: 90 }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ color: theme.textColor1, fontWeight: '500', marginBottom: 5, }}>{loaderMsg}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        elevation: 5,
        marginLeft: 35,
        marginRight: 35,
    },
    msgStyle: {
        color: Color.BLACK,
        fontWeight: '500',
        marginBottom: 5,
    },
});

export default RiteLoader;