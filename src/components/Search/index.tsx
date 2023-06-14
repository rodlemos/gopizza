import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Button, ButtonClear, Container, Input, InputArea } from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
}

export function Search({ onClear, onSearch, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder='Pesquisar' {...rest} />
        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        <MaterialIcons name="search" color={COLORS.TITLE}  size={24} />
      </Button>
    </Container>
  );
}