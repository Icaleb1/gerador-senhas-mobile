export default class SenhaService {
    gerarSenha() {
        const characters = 'caleb';
        let senha = '';
        const tamanhoSenha = characters.length;
        for (let i = 0; i < 8; i++) {
            senha += characters.charAt(Math.floor(Math.random() * tamanhoSenha));
        }
        return senha;
    }
}
