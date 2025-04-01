import * as Clipboard from 'expo-clipboard'

export default class SenhaService {
    gerarSenha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%¨&*()_+-=';
        let senha = '';
        const tamanhoSenha = characters.length;
        for (let i = 0; i < 10; i++) {
            senha += characters.charAt(Math.floor(Math.random() * tamanhoSenha));
        }
        return senha;
    }

    copiarSenha(senha) {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(senha)
            .then(() => alert("Copiado!"))
            .catch(() => this.copiarFallback(senha));
        } else {
          Clipboard.setStringAsync(senha)
            .then(() => alert("Senha copiada para a área de transferência!"))
            .catch(() => alert("Erro ao copiar senha."));
        }
      }
    
      copiarFallback(senha) {
        const input = document.createElement("textarea");
        input.value = senha;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        alert("Senha copiada!");
      }
    
}