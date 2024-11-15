import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraComponent from './components/Camera'; 
import VideoComponent from './components/Video'; 

export default function MediaDisplay() {
    const [photoUri, setPhotoUri] = useState(null);

    const handlePhotoTaken = (uri) => {
        setPhotoUri(uri);
    };

    return (
        <View style={styles.container}>
            <Text>Camera and Video </Text>
            <CameraComponent onPhotoTaken={handlePhotoTaken} />
           
            {photoUri && <Text>Photo Taken!</Text>}

            <VideoComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});