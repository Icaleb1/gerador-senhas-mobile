import AsyncStorage from "@react-native-async-storage/async-storage";

export const gerarSenha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%¨&*()_+-=';
    let senha = '';
    for (let i = 0; i < 10; i++) {
        senha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return senha;
};

export const salvarSenhaComNome = async (nome, senha) => {
    const dados = await AsyncStorage.getItem('senhas');
    const historico = dados ? JSON.parse(dados) : [];

    const nomeDuplicado = historico.find(item => item.nome === nome);
    if (nomeDuplicado) throw new Error('Nome duplicado');

    const novaLista = [...historico, { nome, senha }];
    await AsyncStorage.setItem('senhas', JSON.stringify(novaLista));
};

export const carregarHistorico = async () => {
    const dados = await AsyncStorage.getItem('senhas');
    return dados ? JSON.parse(dados) : [];
};



