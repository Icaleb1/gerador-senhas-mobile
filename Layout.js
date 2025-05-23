import { NavigationContainer } from '@react-navigation/native';
import TelaInicial from './src/views/TelaInicial';
import Login from './src/views/Login';
import Cadastro from './src/views/Cadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Historico from './src/views/Historico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Layout() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRoute('telaInicial');
      } else {
        setInitialRoute('login');
      }
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="telaInicial" component={TelaInicial} options={{ headerShown: false }} />
        <Stack.Screen name="historico" component={Historico} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
