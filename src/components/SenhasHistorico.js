import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';


const SenhasHistorico = ({ senhas, onDelete }) => {
  const [visiveis, setVisiveis] = useState({});

  const alternarVisibilidade = (index) => {
    setVisiveis(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copiarSenha = (senha) => {
    Clipboard.setStringAsync(senha);
    Alert.alert("Copiado", "Senha copiada para a área de transferência.");
  };

  const deletarSenha = (id) => {
    onDelete(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.senhaBox}>
      <Text style={styles.nome}>{item.name}</Text>
      <View style={styles.linhaSenha}>
        <Text style={styles.senhaEscondida}>
          {visiveis[item.id] ? item.password : '********'}
        </Text>
        <TouchableOpacity onPress={() => alternarVisibilidade(item.id)}>
          <Text style={styles.icone}>😑</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copiarSenha(item.password)}>
          <Text style={styles.icone}>✋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deletarSenha(item.id)}>
          <Text style={styles.icone}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={senhas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.lista}
    />
  );
};

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  senhaBox: {
    backgroundColor: '#F2DCF1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#1B0273',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  linhaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: "#011126",
  },
  senhaEscondida: {
    fontSize: 16,
    letterSpacing: 3,
    flex: 1,
    color: "#011126",
  },
  icone: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default SenhasHistorico;