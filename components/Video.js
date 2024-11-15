import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default function VideoComponent() {
    const [videoUri, setVideoUri] = useState(null);
    
    const pickVideo = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaType.Videos, 
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);  
        }
    };

    return (
        <View style={styles.container}>
        
            {videoUri ? (
                <Video
                    source={{ uri: videoUri }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                />
            ) : (
                <Button title="Record a Video" onPress={pickVideo} />
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
    video: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
});
