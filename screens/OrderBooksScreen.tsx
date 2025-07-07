import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.title}>Pedido: {item.id}</Text>
                    {item.libros.map((libro: any, index: number) => (
                        <Text key={index}> • {libro.title} - Estado: {libro.estado}</Text>
                    ))}
                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>
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
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#28a745',
        padding: 8,
        marginTop: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
});
