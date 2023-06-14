import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, RadioButtonsProps, Radio, Selected, Title } from './styles';

type Props = TouchableOpacityProps & RadioButtonsProps & {
  title: string;
}

export function RadioButton({ title, selected = false, ...rest }: Props) {
  return (
    <Container {...rest} selected={selected}>
      <Radio>
        {selected && <Selected />}
      </Radio>
      <Title>{title}</Title>
    </Container>
  );
}