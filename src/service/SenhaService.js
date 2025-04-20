import { getDataStorage, setDataStorage } from '../utils/localStorage'; 

  export const gerarSenha = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%¨&*()_+-=';
      let senha = '';
      const tamanhoSenha = characters.length;
      for (let i = 0; i < 10; i++) {
          senha += characters.charAt(Math.floor(Math.random() * tamanhoSenha));
      }
      return senha;
    }

    export const salvarSenha = async (senha) => {
      await setDataStorage('senha', senha);
    };

    export const coletarSenha = async () => {
      return await getDataStorage('senha');
    };