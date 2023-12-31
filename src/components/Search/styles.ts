import { TextInput } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: -24px;
  padding-horizontal: 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;

  ${({theme})=> css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 48px;
  padding-left: 12px;
  font-family: ${({theme})=> theme.FONTS.TEXT};
`;

export const ButtonClear = styled(TouchableOpacity)`
  margin-right: 7px;

`;

export const Button = styled(RectButton)`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.COLORS.SUCCESS_900};
  border-radius: 12px;
  margin-left: 7px;
`;