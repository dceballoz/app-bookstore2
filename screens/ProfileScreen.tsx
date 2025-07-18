import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { auth, db } from '../firebase/Config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setedad] = useState(0);
  const [celular, setCelular] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'autores', user.uid);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data();
        setUsuario(data!.usuario);
        setCorreo(data!.correo);
        setedad(data!.edad);
        setCelular(data!.celular);
      }
    });

    return () => unsubscribe();
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      })
      .catch((error) => {
        // Manejo de errores si es necesario
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.label}>Escritor:</Text>
        <Text style={styles.value}>{usuario}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{correo}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad}</Text>

        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.value}>{celular}</Text>

        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text style={styles.textButton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 0,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    zIndex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#eee',
  },
  button: {
    backgroundColor: '#7D64C3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 30,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
