import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validarFormulario = () => {

    if (nome.trim() &&
        email.trim() &&
        senha.trim() &&
        confirmarSenha.trim()){
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validarFormulario();
  }, [nome, email, senha, confirmarSenha ]);


  const nvgLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Cadastro</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            keyboardType="text"
            placeholderTextColor="#555"
            value={nome}
            onChangeText={(text) => setNome(text)} 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            placeholderTextColor="#555"
            value={email}
            onChangeText={(text) => setEmail(text)} 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            placeholderTextColor="#555"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            placeholderTextColor="#555"
            value={confirmarSenha}
            onChangeText={(text) => setConfirmarSenha(text)}
          />
        </View>


        <TouchableOpacity
          style={[styles.buttonEntrar, isValid ? {} : styles.buttonDisabilitado]} 
          onPress={nvgLogin} 
          disabled={!isValid} 
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.textoPossuiConta}>

          <TouchableOpacity 
            style={styles.textoCadastro} 
            onPress={nvgLogin}>
            <Text style={styles.textoRota}>Possui uma conta?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2C4B3",
    alignItems: 'center',
    paddingTop: 100,
  },
  tituloInicial: {
    color: "white",
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: "#010440",
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputGroup: {
    width: 350,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    color: "#010440",
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: "#f2DCF1",
    borderWidth: 2,
    borderColor: "#1B0273",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
    fontSize: 16,
  },
  buttonEntrar: {
    width: 150,
    height: 50,
    backgroundColor: "#5288F2",
    borderWidth: 2,
    borderColor: "#1B0273",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabilitado: {
    backgroundColor: "#d3d3d3",
    borderColor: "#a0a0a0", 
  },
  textButton: {
    fontWeight: 'bold',
    color: "#F2F2F2",
    fontSize: 25,
  },
  textoPossuiConta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
  textoRota: {
    fontWeight: 'bold', 
    color: "white",
    fontSize: 15,
  },
  textoCadastro: {
    fontWeight: 'bold',
    color: "#ADD8E6",
    fontSize: 15,
    marginLeft: 5,
  },
});
