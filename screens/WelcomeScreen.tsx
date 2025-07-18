import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');

export default function WelcomeScreen({ navigation }: any) {


  const player = useAudioPlayer(audioSource);






    return (
        <ImageBackground
        style={styles.container}
    source={{uri :"https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg"}}
    
    
        >  
        
            <Text  style={styles.title}>Bienvenido Librero!</Text>
            <Text  style={styles.title}>Registrate o Inicia Sesion para comenzar a subir tus libros!</Text>
 
     <Image 
                source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
                style={styles.image}
                
            />
 
           

            <TouchableOpacity style={styles.button} 
            
            onPress={() => {
                player.seekTo(0);
                player.play();
                navigation.navigate('Login')}}>

                <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} 
            onPress={() => 
            {
                player.seekTo(0);
                player.play();
                navigation.navigate('Register')}}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
       
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5DEF8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#251554',
        textAlign: 'center'
        
    },

    image: {
        width: '100%',
        height: 300,
        marginBottom: 30,
        opacity: 0.7,
        resizeMode:'contain'
        
    },

    button: {
        backgroundColor: '#7D64C3',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        margin: 10,
        width: 200,
        height: 50,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
