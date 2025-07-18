import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Config';
import { Picker } from '@react-native-picker/picker';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');

export default function AddBookScreen() {

  const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

const addBook = async () => {
  if (!id || !title || !genre || !description || !pages || !coverUrl) {

    alertsnd.seekTo(0);
      alertsnd.play();
    Alert.alert('Error', 'Por favor completa todos los enunciados.');
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alertsnd.seekTo(0);
      alertsnd.play();
    Alert.alert('Error', 'Usuario no autenticado.');
    return;
  }

  try {
    await setDoc(doc(db, "books", id.toString()), {
      id: id,
      title: title,
      genre: genre,
      description: description,
      pages: pages,
      coverUrl: coverUrl,
      authorId: user.uid, 
      createdAt: new Date() 
    });
player.seekTo(0);
                player.play();
    Alert.alert('Mensaje', 'El libro se registró correctamente. ID: ' + id);


    setId('');
    setTitle('');
    setGenre('');
    setDescription('');
    setPages('');
    setCoverUrl('');
  } catch (error) {
    alertsnd.seekTo(0);
      alertsnd.play();
    Alert.alert('Error', 'Falla al registrar el libro.');
    console.error(error);
  }
};


  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ingresa tu libro</Text>

        <TextInput
          placeholder="Libro ID"
          style={styles.input}
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Título"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Género</Text>
        <Picker
          selectedValue={genre}
          onValueChange={(itemValue) => setGenre(itemValue)}
          style={styles.picker}
          dropdownIconColor="#251554"
        >
          <Picker.Item label="Selecciona un género" value="" />
          <Picker.Item label="Romance" value="Romance" />
          <Picker.Item label="Ciencia Ficción" value="Ciencia Ficción" />
          <Picker.Item label="Misterio" value="Misterio" />
          <Picker.Item label="Terror" value="Terror" />
        </Picker>
        <TextInput
          placeholder="Descripción"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          placeholder="Número de páginas"
          style={styles.input}
          value={pages}
          onChangeText={setPages}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Imagen URL"
          style={styles.input}
          value={coverUrl}
          onChangeText={setCoverUrl}
        />

        <TouchableOpacity style={styles.button} onPress={addBook}>
          <Text style={styles.buttonText}>Guardar libro</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(229, 222, 248, 0.85)', 
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#251554',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    color: '#251554',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#251554',
  },
  button: {
    backgroundColor: '#7D64C3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: 'center',
    width: 200,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

