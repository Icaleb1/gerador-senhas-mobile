import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

export default function App() {
  const icone = "/home/caleb/Documentos/projetos/geradorSenhas/assets/iconeSenha.png";
  const senha = "senha";

  const click = () => {
    console.log("clique");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.tittleview}>
        <Text style={styles.titulo}>Gerador de senha</Text>
      </View>

      <View style={styles.iconView}>
        <Image
          style={{ width: 350, height: 180}}
          resizeMode="contain"
          source={
              require(icone) }
        />
      </View>
      <View style={styles.buttonsView}>
           
          <View style={styles.labelView}>
            <Text style={styles.textView}>{senha}</Text>
          </View> 

         
          <TouchableOpacity style={styles.buttonView} onPress={(click)}>
            <Text style={styles.textButtonView}>Gerar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonView} onPress={(click)}>
            <Text style={styles.textButtonView}>Copiar</Text>
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
    height: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconView:{
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsView:{
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 32,
  },
  buttonView:{
    width: "70%",
    height: "12%",
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
  },
  textButtonView:{
    fontSize: 32,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#F2F2F2",

  },
  labelView:{
    width: "70%",
    height: "12%",
    backgroundColor: "#F2DCF1",
    borderWidth: 2,
    borderColor: "#1B0273",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },


});
