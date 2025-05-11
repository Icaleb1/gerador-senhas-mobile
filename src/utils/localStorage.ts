import AsyncStorage from "@react-native-async-storage/async-storage";   

export const getDataStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Erro ao obter informações do armazenamento local:", e);
        return [];
    }
};

export const setDataStorage = async (key, data) => {
    try {
        const senhasAtuais = await getDataStorage(key);
        const senhasAtualizadas = [...senhasAtuais, data];
        await AsyncStorage.setItem(key, JSON.stringify(senhasAtualizadas)); 
    } catch (e) {
        console.error("Erro ao salvar informações no armazenamento local:", e);
    }
};
export const cleanDataStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch (e) {
        console.error("Erro ao limpar dados do armazenamento local:", e);
    }
};
