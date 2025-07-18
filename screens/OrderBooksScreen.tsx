import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Config';

export default function OrderBooksScreen() {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchPedidos = async () => {
        const querySnapshot = await getDocs(collection(db, 'pedidos'));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setOrders(data);
    };

    const entregarPedido = async (pedidoId: string) => {
        const pedidoRef = doc(db, 'pedidos', pedidoId);
        await updateDoc(pedidoRef, { entregado: true });
        fetchPedidos();
    };

    useEffect(() => {
        fetchPedidos();
    }, []);
    

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.overlay} />
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            Pedido de {item.nombreUsuario || 'Desconocido'} Nº {item.numeroPedido || '---'}
                        </Text>
                        {item.libros.map((libro: any, index: number) => (
                            <Text key={index} style={styles.bookItem}>
                                • {libro.title} - Estado: {libro.estado}
                            </Text>
                        ))}
                        <Text style={styles.status}>
                            Estado general: {item.entregado ? '✅ Entregado' : '⏳ Pendiente'}
                        </Text>
                        {!item.entregado && (
                            <TouchableOpacity style={styles.button} onPress={() => entregarPedido(item.id)}>
                                <Text style={styles.buttonText}>Hacer entrega</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 0,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 30,
        zIndex: 1,
    },
    card: {
        backgroundColor: '#CABCEF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#7D64C3',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: '#251554',
    },
    bookItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    status: {
        marginTop: 8,
        fontWeight: 'bold',
        color: '#251554',
    },
    button: {
        backgroundColor: '#7D64C3',
        paddingVertical: 12,
        borderRadius: 50,
        marginTop: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
