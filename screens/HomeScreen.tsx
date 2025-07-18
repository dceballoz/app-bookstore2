import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function HomeScreenAutor() {
  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/ae/3c/c5/ae3cc52638693bc16a4f19522fc86c77.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>Panel del Autor</Text>
        <Text style={styles.subtitle}>
          Sube tus libros, administra tus publicaciones y comparte tus historias con los lectores.
        </Text>
        <Text style={styles.footer}>Usa el menú inferior para añadir libros o revisar tus publicaciones ✍️</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#251554',
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20
  },
  footer: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20
  }
});
