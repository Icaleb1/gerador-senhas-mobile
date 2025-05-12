import { NavigationContainer } from '@react-navigation/native';
import TelaInicial from './src/views/TelaInicial';
import Login from './src/views/Login';
import Cadastro from './src/views/Cadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Historico from './src/views/Historico';

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="cadastro" component={Cadastro} options={{HeaderShown:false}}/>
        <Stack.Screen name="login" component={Login} options={{HeaderShown:false}}/>
        <Stack.Screen name="telaInicial" component={TelaInicial} options={{HeaderShown:false}}/>
        <Stack.Screen name="historico" component={Historico} options={{HeaderShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );

}









