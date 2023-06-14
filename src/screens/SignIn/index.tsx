import brandImage from '@assets/brand.png';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useAuth } from '@hooks/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Brand, Container, Content, ForgotPasswordButton, ForgotPasswordLabel, Title } from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLogging, signIn, forgotPassword} = useAuth();

  function handleSignIn() {
    signIn(email, password)
  }

  function handleForgotPassword() {
    forgotPassword(email)
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Brand source={brandImage} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type='secundary'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
            style={{backgroundColor: 'transparent'}}
          />

          <Input
            placeholder="Senha"
            type='secundary'
            secureTextEntry
            onChangeText={setPassword}
            style={{backgroundColor: 'transparent'}}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button 
            title='Entrar'
            type='secundary'
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container >
  );
}