import { Button } from '@components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({theme})=> ({
  colors: theme.COLORS.GRADIENT
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() +33}px 24px 58px;
`;

export const Greeting = styled.View`
  flex-direction: row;
  text-align: center;
`;

export const GreetingEmoji = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme})=> theme.COLORS.SHAPE};
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;

${({theme})=> css`
  font-family: ${theme.FONTS.TITLE};
  color: ${theme.COLORS.SECONDARY_900};
`}
`;

export const MenuItemsCount = styled.Text`
  font-size: 14px;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const NewProductButton = styled(Button)`
  margin-horizontal: 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;