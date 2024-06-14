<template>
  <div class="md:w-1/2 md:pr-4">
    <label class="form-control w-full max-w-xs">
      <div class="join">
        <input
          type="text"
          class="input input-bordered join-item"
          v-model="nombreUsuario"
          placeholder="Colocar nombre"
        />
        <button class="btn btn-neutral join-item" @click="buscarUsuario">Cargar Datos</button>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import router from '@/router';

import { useRuletaStore } from '@/stores/main.store';

import { cargarDatosUsuario } from '@/services/apiService';

const ruletaStore = useRuletaStore();

const nombreUsuario = ref('');

const buscarUsuario = async () => {
  if (!nombreUsuario.value) {
    alert('Debe escribir un nombre para relizar la busqueda');
    return false;
  }

  if (!ruletaStore.juegoGuardado) {
    const isConfirm = confirm('existen resultados que no fueron guardados. ¿Desea continuar?');

    if (!isConfirm) return false;
  }

  const { status, data: usuarioDto } = await cargarDatosUsuario(nombreUsuario.value);

  if (status === 404) {
    alert('No se encontró usuario');
    return false;
  }

  await ruletaStore.updateUsuario(usuarioDto);
  nombreUsuario.value = '';

  alert('Se cargaron datos del usuario');
  router.push({ path: '/game' });
};
</script>
