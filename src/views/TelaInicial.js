import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { carregarHistorico, gerarSenha } from '../service/SenhaService';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from "../../assets/iconeSenha.png";
import ModalSalvar from '../components/ModalSalvar';
import { mostrarToast } from '../components/ToastFeedback';
import { createItem } from '../service/auth/itemService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export default function TelaInicial({navigation}){ 
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("gerar senha");
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        const carregar = async () => {
          const lista = await carregarHistorico();
          setHistorico(lista);
        };
        carregar();
      }, []);
      
      const salvarSenha = async () => {
        if (!nome.trim()) {
          mostrarToast('error', 'Erro', 'O nome não pode estar vazio.');
          return;
        }
      
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            throw new Error('Usuário não autenticado. Token não encontrado.');
          }
      
          await createItem(nome, senha, token);
      
          setModalVisible(false);
          mostrarToast('success', 'Sucesso', 'Senha salva com sucesso!');
        } catch (e) {
          mostrarToast('error', 'Erro ao salvar', e.message);
        }
      };
      
    
  
    const coletarSenha = () => {
        setSenha(gerarSenha());
    };

    const copiar = async () => { 
      await Clipboard.setStringAsync(senha);
      mostrarToast('success', 'Copiado', 'Senha copiada para a área de transferência.');
  };
    

    const nvgHistorico = async () => {
        navigation.navigate("historico");
    };

    const logout = async () => {
      try {
          await AsyncStorage.removeItem('token');
          navigation.replace('login');
      } catch (e) {
          mostrarToast('error', 'Erro', 'Erro ao fazer logout.');
      }
  };
  
   

    return (
    <View style={styles.container}>
        <ModalSalvar
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onConfirm={async () => {
            await salvarSenha();
            setModalVisible(false);
        }} 
        nome={nome}
        setNome={setNome}
        senha={senha}
        />
        <StatusBar style="auto" />

        <View style={styles.tittleview}>
        <Text style={styles.titulo}>Gerador de senhas</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Deslogar</Text>
        </TouchableOpacity>


        <View style={styles.iconView}>
        <Image
            style={{ width: 350, height: 180}}
            resizeMode="contain"
            source={logo}
        />
        </View>
        <View style={styles.buttonsView}>
            
            <View style={styles.labelView}>
            <Text style={styles.textView}>{senha}</Text>
            </View> 

            
            <TouchableOpacity style={styles.buttonView} onPress={(coletarSenha)}>
            <Text style={styles.textButtonView}>Gerar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(true)}>
            <Text style={styles.textButtonView}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonView} onPress={(copiar)}>
            <Text style={styles.textButtonView}>Copiar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={styles.historico} onPress={(nvgHistorico)}>Ver histórico</Text>
            </TouchableOpacity>
        </View>
        <Toast />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F2C4B3',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
    },
    titulo:{
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#010440",
    },
    tittleview:{
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "flex-end",
    },
    iconView:{
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center"
    },
    buttonsView:{
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 25,
    },
    buttonView:{
    width: "60%",
    height: "14%",
    backgroundColor: "#5288F2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1B0273",

    },
    textView:{
    fontSize: 32,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#011126",
    paddingBottom: 6,
    },
    textButtonView:{
    fontSize: 32,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#F2F2F2",
    paddingBottom: 6,

    },
    labelView:{
    width: "70%",
    height: "16%",
    backgroundColor: "#F2DCF1",
    borderWidth: 2,
    borderColor: "#1B0273",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    },
    historico:{
        paddingTop: 0,
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
    },
    logoutButton: {
      position: 'absolute',
      top: 30,
      right: 20,
      backgroundColor: '#FF5C5C',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#A10000',
  },
  logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  
});
