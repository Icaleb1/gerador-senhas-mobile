import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SenhasHistorico from '../components/SenhasHistorico';

export default function Historico() {
  const [senhasSalvas, setSenhasSalvas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarSenhas = async () => {
      const dados = await AsyncStorage.getItem('senhas');
      if (dados) {
        setSenhasSalvas(JSON.parse(dados));
      }
    };
    carregarSenhas();
  }, []);

  const deletarSenha = async (index) => {
    const novaLista = [...senhasSalvas];
    novaLista.splice(index, 1);
    await AsyncStorage.setItem('senhas', JSON.stringify(novaLista));
    setSenhasSalvas(novaLista);
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