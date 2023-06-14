import React from 'react';
import { Container, Content, Description, Details, Image, Line, Name, Identification } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

export type ProductProps = {
  id: string;
  picture_url: string;
  name: string;
  description: string;
}

type Props = RectButtonProps & {
  data: ProductProps
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.picture_url }} />
        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name='chevron-right' color={COLORS.SHAPE} size={8} />
          </Identification>
          <Description>{data.description}</Description>
        </Details>
      </Content>
      <Line />
    </Container>
  );
}