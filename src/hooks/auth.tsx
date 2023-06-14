import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
}

type AuthContexData = {
  user: User | null;
  isLogging: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

const USER_COLLECTION = '@gopizza:users';

export const AuhtContext = createContext({} as AuthContexData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if (!password || !email) {
      return Alert.alert("Login", "Preencha os campos de email e senha.")
    }

    setIsLogging(true);

    auth().signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore().collection('users').doc(account.user.uid).get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              };

              setUser(userData);
              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
            }
          })
          .catch(() => Alert.alert("Login",
            "Não foi possível buscar os dados do usuário."))
      })
      .catch(error => {
        const { code } = error
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert("Login", "E-mail ou senha inválido!");
        } else {
          return Alert.alert("Login", "Não foi possível realizar o login.")
        }
      })
      .finally(() => setIsLogging(false))
  }

  async function loadStoredUserData() {
    setIsLogging(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe o e-mail.")
    }

    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert("Redefinir senha", "Um link para redefinir a senha foi enviado para o e-mail informado."))
      .catch(() => Alert.alert("Redefinir senha", "Não foi possível enviar o link para o e-mail informado."));
  }

  useEffect(() => {
    loadStoredUserData();
  }, []);

  return (
    <AuhtContext.Provider value={{ isLogging, signIn, signOut, forgotPassword, user }}>
      {children}
    </AuhtContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuhtContext);

  return context;
}

export { AuthProvider, useAuth };

