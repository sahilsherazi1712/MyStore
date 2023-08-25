import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    TourGuideZone,
    useTourGuideController,
} from 'rn-tourguide';

const TourWrapper = ({ tourKey, zone, text, children, onStop, style }) => {

    const { canStart, start, stop, eventEmitter, tourKey: localTourKey } = useTourGuideController(`${tourKey}`)
    const isFocused = useIsFocused()

    useEffect(()=>{
        const checkTourShown = async() => {
            try {
                const isTourShown = await AsyncStorage.getItem('tourShown')
                if(isTourShown !== 'true' && canStart){
                    start()
                }
            } catch (error) {
                console.log('Error, checking tour shown', error);
            }
        }
        checkTourShown()
    },[isFocused,canStart])

    // const handleOnStart = () => console.log('start')
    // const handleOnStop = () => console.log('stop')
    // const handleOnStepChange = () => console.log(`stepChange`)

    useFocusEffect(() => {
        eventEmitter?.on('start', () => {
            console.log('start')
        })
        eventEmitter?.on('stepChange', () => {
            console.log(`stepChange`)
        })
        eventEmitter?.on('stop', () => {
            console.log('stop')
            onStop();
        })
        return () => {
            // eventEmitter?.off('*', null)
            eventEmitter?.off('start', ()=>{})
            eventEmitter?.off('stop', ()=>{})
            eventEmitter?.off('stepChange', ()=>{})
        }
    })
    return (
        <TourGuideZone tourKey={localTourKey} zone={zone} text={text} style={style}>
            {children}
        </TourGuideZone>
    );
};

export default TourWrapper;
