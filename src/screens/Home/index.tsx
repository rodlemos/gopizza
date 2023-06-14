import happyEmoji from '@assets/happy.png';
import { ProductCard, ProductProps } from '@components/ProductCard';
import { Search } from '@components/Search';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsCount, NewProductButton, Title } from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  
  const { COLORS } = useTheme();
  const { navigate } = useNavigation();
  const { signOut, user } = useAuth();

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore().collection('pizzas').orderBy('name_insensitive')
      .startAt(formattedValue).endAt(`${formattedValue}\uf8ff`).get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() => Alert.alert("Consulta", "Não foi possível realizar a consulta."));
  }

  async function handleSearch() {
    fetchPizzas(search)
  }

  async function handleClear() {
    setSearch('')
    fetchPizzas('')
  }

  async function handleOpen(id: string) {
    const route = user?.isAdmin ? 'products' : 'order'
    navigate(route, { id });
  }

  async function handleAdd() {
    navigate('products', {})
  }

  useFocusEffect(useCallback(() => {
    fetchPizzas('')
  }, []));

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, {user?.name}</GreetingText>
        </Greeting>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onClear={handleClear}
        onSearch={handleSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsCount>{pizzas.length} pizzas</MenuItemsCount>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          marginHorizontal: 24
        }}
      />

      {user?.isAdmin && <NewProductButton
        title='Cadastrar Pizza'
        type='secundary'
        onPress={handleAdd}
      />}
    </Container>
  );
}