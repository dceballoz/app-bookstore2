import React, { useState } from 'react';
import {  View,  Text,  TextInput,  Alert,  StyleSheet,  ScrollView,  TouchableOpacity,  ImageBackground} from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Config';
import { Picker } from '@react-native-picker/picker';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');

export default function EditBooksScreen() {

  const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const cargarLibro = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const ref = doc(db, 'books', id);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().authorId === user.uid) {
        player.seekTo(0);
 player.play();
        const data = snap.data();
        setTitle(data.title);
        setGenre(data.genre);
        setDescription(data.description);
        setPages(data.pages);
        setCoverUrl(data.coverUrl);
         
      } else {
        alertsnd.seekTo(0);
      alertsnd.play();
        Alert.alert('Error', 'Libro no encontrado o no autorizado.');
      }
    } catch (error) {
      console.error(error);
      alertsnd.seekTo(0);
      alertsnd.play();
      Alert.alert('Error', 'Error al cargar el libro.');
    }
  };

  const actualizarLibro = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const ref = doc(db, 'books', id);
      await updateDoc(ref, {
        title,
        genre,
        description,
        pages,
        coverUrl,
      });
 player.seekTo(0);
 player.play();
      Alert.alert('Éxito', 'Libro actualizado correctamente');
      setId('');
      setTitle('');
      setGenre('');
      setDescription('');
      setPages('');
      setCoverUrl('');
    } catch (error) {
      console.error(error);

      alertsnd.seekTo(0);
      alertsnd.play();
      Alert.alert('Error', 'No se pudo actualizar el libro.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Libro</Text>

        <TextInput
          placeholder="ID del libro"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />

        <TouchableOpacity onPress={cargarLibro} style={styles.button}>
          <Text style={styles.buttonText}>Cargar libro</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Género</Text>
        <Picker
          selectedValue={genre}
          onValueChange={(value) => setGenre(value)}
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
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />

        <TextInput
          placeholder="Número de páginas"
          value={pages}
          onChangeText={setPages}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Imagen URL"
          value={coverUrl}
          onChangeText={setCoverUrl}
          style={styles.input}
        />

        <TouchableOpacity onPress={actualizarLibro} style={[styles.button, styles.updateButton]}>
          <Text style={styles.buttonText}>Actualizar libro</Text>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#251554',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
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
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
