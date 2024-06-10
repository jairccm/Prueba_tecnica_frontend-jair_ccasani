import axios from 'axios';
import type { DatosApuesta } from '@/modules/interfaces/datosApuesta.interface';
const apiBaseUrl = import.meta.env.VITE_RULETA_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

export const cargarDatosUsuario = async (nombre: string) => {
  return await apiClient.get(`usuario-data/${nombre}`);
};

export const obtenerResultado = async () => {
  return await apiClient.get(`numero-azar`);
};

export const guardarApuesta = async (apuesta: DatosApuesta) => {
  return await apiClient.post(`guardar-apuesta`, apuesta);
};
