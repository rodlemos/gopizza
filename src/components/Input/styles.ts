import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

export type TypeProps = 'primary' | 'secundary';

type Props = {
  type: TypeProps;
}

export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
  placeholderTextColor: type === 'primary' 
    ? theme.COLORS.SECONDARY_900
    : theme.COLORS.PRIMARY_50
}))<Props>`
  width: 100%;
  height: 56px;
  background-color: ${({theme})=> theme.COLORS.TITLE};
  border-radius: 12px;
  font-size: 20px;
  padding-vertical: 7px;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({theme, type}) => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === 'primary'
      ? theme.COLORS.PRIMARY_900
      : theme.COLORS.TITLE
    }
  `}
`;