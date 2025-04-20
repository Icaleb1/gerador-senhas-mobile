import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';
import logo from "../../assets/iconeSenha.png";
import { gerarSenha } from '../service/SenhaService';  
import { useState } from 'react';

export default function TelaInicial({navigation}){ 
    const [senha, setSenha] = useState("gerar senha");

    const coletarSenha = () => {
        setSenha(gerarSenha());
    };

    const copiar = async () => { 
        await Clipboard.setStringAsync(senha);
    };

    const histórico = async () => {
        navigation.navigate("historico");
    };
   

    return (
    <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.tittleview}>
        <Text style={styles.titulo}>Gerador de senhas</Text>
        </View>

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

            <TouchableOpacity style={styles.buttonView} onPress={(copiar)}>
            <Text style={styles.textButtonView}>Copiar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={styles.historico}>Ver histórico</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F2C4B3',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
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
    gap: 45,
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
});
