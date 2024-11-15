import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera'; 

export default function CameraComponent({ onPhotoTaken }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState('back');
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
            onPhotoTaken(photo.uri);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting permissions...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type} 
                ref={cameraRef} 
            >
                <View style={styles.buttonContainer}>
                    <Button title="Take Photo" onPress={handleTakePhoto} />
                    <Button
                        title="Flip Camera"
                        onPress={() => {
                            setType(type === 'back' ? 'front' : 'back');
                        }}
                    />
                </View>
            </Camera>

            {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.image} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
});