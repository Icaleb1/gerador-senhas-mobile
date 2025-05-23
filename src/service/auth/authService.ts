import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email, password) {
  try {
    const response = await api.post('/login', { email, password });
    const data = response.data;

    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
    } else {
      throw new Error('Token não encontrado na resposta do servidor');
    }

    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error ||
                            error.response.data.message ||
                            'Erro desconhecido no servidor';

      const statusMessages = {
        400: 'Dados inválidos',
        401: 'Não autorizado',
        404: 'Usuário não encontrado',
        409: 'Conflito de dados',
        500: 'Erro interno do servidor'
      };

      throw new Error(statusMessages[error.response.status] || errorMessage);

    } else if (error.request) {
      throw new Error('Servidor não respondeu. Verifique sua conexão.');
    } else {
      throw new Error('Erro ao configurar a requisição: ' + error.message);
    }
  }
}

export async function signup(name, email, password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new Error('As senhas não coincidem');
  }

  try {
    const response = await api.post('/signup', { name, email, password, confirmPassword });
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error ||
                            error.response.data.message ||
                            'Erro desconhecido no servidor';

      const statusMessages = {
        400: 'Dados inválidos',
        401: 'Não autorizado',
        404: 'Endpoint não encontrado',
        409: 'Usuário já cadastrado',
        500: 'Erro interno no servidor'
      };

      throw new Error(statusMessages[error.response.status] || errorMessage);

    } else if (error.request) {
      throw new Error('Servidor não respondeu. Verifique sua conexão.');
    } else {
      throw new Error('Erro ao configurar a requisição: ' + error.message);
    }
  }
}
