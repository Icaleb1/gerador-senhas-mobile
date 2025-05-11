import { Modal, Pressable, View, TextInput, Text, StyleSheet } from "react-native";

export default function ModalSalvar({ visible, onClose, onConfirm, nome, setNome, senha }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText} >Informe o Nome:</Text>
                    <TextInput
                      style={styles.input}
                      value={nome}
                      onChangeText={setNome}
                      placeholder="Ex: senha do e-mail"
                    />

                    <Text style={styles.modalText}>Senha Gerada:</Text>
                    <TextInput
                      style={styles.input}
                      value={senha}
                      editable={false}
                    />

                    <Pressable style={styles.button} onPress={onConfirm}>
                        <Text>Salvar</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={onClose}>
                        <Text>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
      width: "80%",
      backgroundColor: "white",
      borderRadius: 12,
      padding: 20,
      alignItems: "center",
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      fontSize: 18,
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 15
    },
    button: {
      backgroundColor: "#5288F2",
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      width: "100%",
      alignItems: "center"
    },
    buttonText: {
      color: "white",
      fontWeight: "bold"
    }
});
  
