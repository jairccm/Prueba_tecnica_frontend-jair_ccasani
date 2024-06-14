import { defineStore } from 'pinia';
import { ref } from 'vue';

const usuarioInicial: Usuario = {
  nombre: '',
  monto: 0.0,
  existeUsuario: false,
};

export const useRuletaStore = defineStore('usuario', () => {
  const usuario = ref<Usuario>(usuarioInicial);
  const montoApuestaInicial = ref<number>(0);
  const montoPremio = ref<number>(0);
  const juegoIniciado = ref<boolean>(false);
  const juegoGuardado = ref<boolean>(false);
  const showButtonGuardarResultado = ref(false);

  const updateUsuario = async (usuarioDto: Usuario) => {
    usuario.value.nombre = usuarioDto.nombre;
    usuario.value.monto = usuarioDto.monto;
    usuario.value.existeUsuario = usuarioDto.existeUsuario;
    showButtonGuardarResultado.value = false;
  };

  return {
    usuario,
    juegoGuardado,
    montoPremio,
    showButtonGuardarResultado,
    juegoIniciado,
    montoApuestaInicial,
    updateUsuario,
  };
});
