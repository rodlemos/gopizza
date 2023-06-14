import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PIZZA_SIZES } from '@utils/pizzaTypes';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Container, ContentScroll, Form, FormRow, Header, InputGroup, Label, Picture, Price, Sizes, Title } from './styles';
import firestore from '@react-native-firebase/firestore';
import { OrderNavigationProps } from '@src/@types/navigation';
import { ProductProps } from '@components/ProductCard';
import { Alert } from 'react-native';
import { useAuth } from '@hooks/auth';

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [table, setTable] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;
  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00';
  const { user } = useAuth();

  function handleGoBack() {
    goBack();
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza.")
    }

    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade.")
    }

    if (!table) {
      return Alert.alert("Pedido", "Informe o número da mesa")
    }

    setSendingOrder(true);
    firestore().collection('orders').add({
      pizza: pizza.name,
      size,
      quantity,
      amount,
      table,
      status: 'Preparando',
      waiter_id: user?.id,
      picture: pizza.picture_url
    }).then(() => navigate('home'))
      .catch(() =>{ 
        Alert.alert("Pedido", "Não foi possível realizar o pedido.")
        setSendingOrder(false);
      });

  }

  useEffect(() => {
    if (id) {
      firestore().collection('pizzas').doc(id).get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert("Pedido", "Não foi possível carregar o produto"))
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Picture source={{ uri: pizza.picture_url }} />

        <Form>
          <Title>{pizza.name}</Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_SIZES.map(item => (
              <RadioButton key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType='numeric'
                onChangeText={setTable}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Total: R$ {amount}</Price>
          <Button 
            title='Confirmar pedido'
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}