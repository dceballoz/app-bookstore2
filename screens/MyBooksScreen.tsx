import { View, Text, FlatList, Image, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/Config';
import { useFocusEffect } from '@react-navigation/native';

export default function MyBooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(collection(db, "books"), where("authorId", "==", user.uid));
      const snapshot = await getDocs(q);
      const list: Book[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];

      setBooks(list);
    } catch (error) {
      console.error('Error al obtener libros del autor:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchMyBooks();
    }, [])
  );

  type Book = {
    id: string;
    title: string;
    genre: string;
    description: string;
    pages: string;
    coverUrl: string;
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.header}>Mis libros subidos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#7D64C3" />
        ) : books.length === 0 ? (
          <Text style={styles.noBooks}>Aún no has subido ningún libro.</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.coverUrl }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.genre}>{item.genre}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.pages}>Páginas: {item.pages}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  noBooks: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  genre: {
    fontStyle: 'italic',
    color: '#777',
  },
  description: {
    marginTop: 4,
    color: '#444',
  },
  pages: {
    marginTop: 4,
    color: '#444',
  },
});
