import { OrderCards, OrderProps } from '@components/OrderCards';
import { ItemSeparator } from '@components/ItemSeparator';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Title } from './styles';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/auth';
import { Alert } from 'react-native';

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { user } = useAuth();

  function handlePizzaDelivered(id: string) {
    Alert.alert("Pedido", "Confirmar a entrega?", [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('orders').doc(id).update({
            status: 'Entregue'
          })
        }
      }
    ])
  }

  useEffect(() => {
    const subscribe = firestore().collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCards
            index={index}
            data={item}
            disabled={item.status === "Entregue"}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}