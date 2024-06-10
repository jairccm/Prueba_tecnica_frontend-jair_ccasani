<template>
  <div class="grid grid-cols-1 mb-4">
    <div class="m-auto">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Saldo Inicial:</span>
        </div>
        <input
          type="number"
          v-model="juegoTemp.montoInicial"
          min="0"
          step="10"
          placeholder="Colocar saldo incial"
          class="input input-bordered input-warning w-full max-w-xs"
        />
      </label>
    </div>
    <div class="m-auto">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Monto Apuesta:</span>
        </div>
        <input
          type="number"
          step="1"
          min="1"
          v-model="juegoTemp.montoApuesta"
          placeholder="Colocar monto apuesta"
          class="input input-bordered input-info w-full max-w-xs"
        />
      </label>
    </div>
  </div>

  <div class="mb-4 m-auto">
    <div class="md:w-1/2 md:pr-4">
      <button class="btn btn-primary" @click="iniciarJuego">INICIAR JUEGO</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRuletaStore } from '@/stores/main.store';
import router from '@/router';

interface JuegoTemp {
  montoInicial: number;
  montoApuesta: number;
}

const ruletaStore = useRuletaStore();

const juegoTemp = ref<JuegoTemp>({ montoInicial: 0, montoApuesta: 0 });

const iniciarJuego = () => {
  if (!juegoTemp.value.montoInicial && juegoTemp.value.montoInicial <= 0) {
    alert('Debe colocar un monto inicial válido mayor a cero');
    return false;
  }

  if (!juegoTemp.value.montoApuesta && juegoTemp.value.montoApuesta <= 0) {
    alert('Debe colocar un monto de apuesta válido mayor a cero');
    return false;
  }

  if (juegoTemp.value.montoApuesta >= juegoTemp.value.montoInicial) {
    alert('El monto de apuesta no puede ser mayor al saldo');
    return false;
  }

  if (ruletaStore.juegoIniciado && !ruletaStore.juegoGuardado) {
    const isConfirm = confirm(
      'esta cambiando de usuario, se prederan los datos no guardados. ¿Desea continuar?',
    );

    if (!isConfirm) return false;
  }

  ruletaStore.juegoIniciado = true;
  ruletaStore.usuario.monto = juegoTemp.value.montoInicial;
  ruletaStore.montoApuestaInicial = juegoTemp.value.montoApuesta;
  router.push({ path: '/game' });
};
</script>
