import axios from 'axios';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

export default api;
