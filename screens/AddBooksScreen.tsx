import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/Config';

import { Picker } from '@react-native-picker/picker';


export default function AddBookScreen() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const addBook = async () => {
    if (!id || !title || !genre || !description || !pages || !coverUrl) {
      Alert.alert('Error', 'Por favor completa todo los enunciados.');
      return;
    }

    try {
      await setDoc(doc(db, "books", id.toString()), {
        id: id,
        title: title,
        genre: genre,
        description: description,
        pages: pages,
        coverUrl: coverUrl
      });

      Alert.alert('Mensaje', 'El libro se registro correctamente. ID: ' + id);


      setId('');
      setTitle('');
      setGenre('');
      setDescription('');
      setPages('');
      setCoverUrl('');
    } catch (error) {
      Alert.alert('Error', 'Falla al registrar el libro.');
    }
  };

  return (

<ImageBackground
source={{uri :"https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg"}}
style={styles.container}
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
        placeholder="Titulo"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Género</Text>
      <Picker
        selectedValue={genre}
        onValueChange={(itemValue) => setGenre(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un género" value="" />
        <Picker.Item label="Romance" value="Romance" />
        <Picker.Item label="Ciencia Ficción" value="Ciencia Ficción" />
        <Picker.Item label="Misterio" value="Misterio" />
        <Picker.Item label="Terror" value="Terror" />
      </Picker>
      <TextInput
        placeholder="Descripcion"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        placeholder="Numero de paginas"
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
  <Text style={styles.buttonText} >Guardar libro</Text>
</TouchableOpacity>

    </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E5DEF8',
    flexGrow: 1,

    
        
  },
 


  title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#251554',
        textAlign: 'center'
        
    },


  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15

  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
},
label: {
  fontSize: 16,
  fontWeight: '500',
  marginBottom: 5,
  color: '#333'
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
