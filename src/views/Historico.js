import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SenhasHistorico from '../components/SenhasHistorico';
import { deleteItem, getItens } from '../service/auth/itemService';
import Toast from 'react-native-toast-message';
import { mostrarToast } from '../components/ToastFeedback';

export default function Historico() { 
  const [senhasSalvas, setSenhasSalvas] = useState([]);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarTokenESenhas = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          mostrarToast('error', 'Erro', 'Token não encontrado. Faça login novamente.');
          return;
        }
        setToken(storedToken);

        const dados = await getItens(storedToken);
        setSenhasSalvas(dados);
      } catch (error) {
        mostrarToast('error', 'Erro', error.message);
      }
    };

    carregarTokenESenhas();
  }, []);

  const deletarSenha = async (id) => {
    if (!token) {
      mostrarToast('error', 'Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      await deleteItem(id, token);
      const novaLista = senhasSalvas.filter(item => item.id !== id);
      setSenhasSalvas(novaLista);
      mostrarToast('success', 'Sucesso', 'Senha deletada com sucesso.');
    } catch (error) {
      mostrarToast('error', 'Erro ao deletar', error.message);
    }
  };

  const nvgTelaInicial = () => {
    navigation.navigate("telaInicial");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Histórico de Senhas</Text>
      
      <SenhasHistorico 
        senhas={senhasSalvas} 
        onDelete={deletarSenha} 
      />
      
      <View style={styles.containerBotao}>
        <TouchableOpacity style={styles.buttonVoltar} onPress={nvgTelaInicial}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2C4B3",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tituloInicial: {
    color: "#010440",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonVoltar: {
    width: 150,
    height: 50,
    backgroundColor: "#5288F2",
    borderWidth: 2,
    borderColor: "#1B0273",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 25,
  },
  containerBotao: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
