import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Description, Name, Picture, StatusContainer, StatusLabel, StatusTypesProps } from './styles';

export type OrderProps = {
  id: string;
  pizza: string;
  picture: string;
  status: StatusTypesProps;
  table: string;
  quantity: string;
}

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
}

export function OrderCards({index, data, ...rest}: Props) {
  return (
    <Container index={index} {...rest}>
      <Picture source={{uri: data.picture}}/>
      <Name>{data.pizza}</Name>
      <Description>Mesa {data.table} - Qnt: {data.quantity}</Description>
      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{data.status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
}