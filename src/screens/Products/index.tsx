import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';
import { ProductPicture } from '@components/ProductPicture';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductNavigationProps } from '@src/@types/navigation';
import { ProductProps } from '@src/components/ProductCard';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, DeleteLabel, Form, Header, InputGroup, InputGroupHeader, Label, MaxCharacters, PickImageButton, Title, Upload } from './styles';

type PizzaResponse = ProductProps & {
  picture_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Products() {
  const [picture, setPicture] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const { id } = route.params as ProductNavigationProps;

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setPicture(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome do produto.")
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição do produto.")
    }

    if (!picture) {
      return Alert.alert("Cadastro", "Selecione uma imagem para o produto.")
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert("Cadastro", "Informe o(s) valor(es) do produto.")
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);
    await reference.putFile(picture);
    const picture_url = await reference.getDownloadURL();

    firestore().collection('pizzas').add({
      name,
      name_insensitive: name.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      },
      picture_url,
      picture_path: reference.fullPath
    })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
      .catch(() => Alert.alert('Cadastro', 'não foi possível cadastrar a Pizza.'))

    setIsLoading(false);
    navigate('home');
  }

  function handleGoBack() {
    goBack();
  }

  function handleDelete() {
    firestore().collection('pizzas').doc(id).delete()
      .then(() => {
        storage().ref(picturePath).delete()
          .then(() => navigate('home'))
      })
  }

  useEffect(() => {
    if (id) {
      firestore().collection('pizzas').doc(id).get()
        .then(response => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setPicture(product.picture_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPicturePath(product.picture_path);
        })
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton onPress={handleGoBack} />
        <Title>Cadastrar</Title>
        {id
          ? <TouchableOpacity onPress={handleDelete}>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
          : <View style={{ width: 20 }} />
        }
      </Header>

      <Upload>
        <ProductPicture uri={picture} />
        {!id && <PickImageButton
          title='Carregar'
          type='secundary'
          onPress={handleImagePicker}
        />}
      </Upload>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice size='P'
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice size='M'
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice size='G'
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          {!id && <Button
            title='Cadastrar Pizza'
            isLoading={isLoading}
            onPress={handleAdd}
          />}
        </Form>
      </ScrollView>
    </Container>
  );
}