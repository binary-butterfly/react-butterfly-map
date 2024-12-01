import React from 'react';
import {Position} from '../Types/types';

export const updateUserPosition = (
    setCenterMapDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    locationBlocked: boolean,
    setLocationBlocked: React.Dispatch<React.SetStateAction<boolean>>,
    setUserPosition: React.Dispatch<React.SetStateAction<Position | undefined>>,
): boolean => {
    if (window.localStorage.getItem('geolocationBlocked') !== 'true' && !locationBlocked) {
        try {
            if (isSecureContext) {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        setCenterMapDisabled(false);
                        setLocationBlocked(false);
                        setUserPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
                    }, () => {
                        window.localStorage.setItem('geolocationBlocked', 'true');
                        setLocationBlocked(true);
                    });
                    return true;
                } else {
                    console.info('Geolocation permission not given or feature not available.');
                }
            } else {
                console.info('Geolocation is only available in a secure context');
            }
        } catch {
            console.debug('Could not get geolocation. Are you using a somewhat modern browser?');
        }
    } else {
        console.log('geoblock???', locationBlocked);
        setCenterMapDisabled(false);
        setLocationBlocked(true);
    }
    return false;
};

export const calculateDistance = (position: Position, to: Position): number => {
    return Math.abs(position.latitude - to.latitude) + Math.abs(position.longitude - to.longitude);
};

