<template>
  <div class="bg-white shadow-md rounded px-4 py-4">
    <div class="stats stats-vertical shadow">
      <div class="stat">
        <div class="stat-title mb-2">Monto Apuesta</div>
        <div class="stat-value">
          <label class="form-control w-full max-w-xs">
            <input
              type="number"
              step="1"
              min="1"
              v-model="apuesta.montoApuesta"
              placeholder="Ingresar apuesta"
              class="input input-bordered input-info w-full max-w-xs"
            />
          </label>
        </div>
        <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
      </div>

      <div class="stat">
        <div class="stat-title">Seleccionar color</div>
        <div class="stat-value">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Rojo</span>
              <input
                type="radio"
                name="radio-10"
                v-model="apuesta.color"
                value="0"
                class="radio checked:bg-red-500"
                checked
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Negro</span>
              <input
                type="radio"
                name="radio-10"
                v-model="apuesta.color"
                value="1"
                class="radio checked:bg-black"
                checked
              />
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="stats stats-vertical shadow">
      <div class="stat">
        <div class="stat-title mb-2">Numero Ganador</div>
        <div class="stat-value">
          <label class="form-control w-full max-w-xs">
            <input
              type="number"
              step="1"
              min="0"
              max="36"
              v-model="apuesta.numero"
              placeholder="Ingresar Numero"
              class="input input-bordered input-info w-full max-w-xs"
            />
          </label>
        </div>
        <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
      </div>

      <div class="stat">
        <div class="stat-title">Seleccionar Tipo Numero</div>
        <div class="stat-value">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Impar</span>
              <input
                type="radio"
                name="tipoNumero"
                v-model="apuesta.tipoNumero"
                value="1"
                class="radio checked:bg-indigo-300"
                checked
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Par</span>
              <input
                type="radio"
                name="tipoNumero"
                v-model="apuesta.tipoNumero"
                value="0"
                class="radio checked:bg-indigo-300"
                checked
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Ninguno</span>
              <input
                type="radio"
                name="tipoNumero"
                v-model="apuesta.tipoNumero"
                value="2"
                class="radio checked:bg-indigo-300"
                checked
              />
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="" style="text-align: end">
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" @click="jugar">JUGAR</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

import type { DatosApuesta } from '@/modules/interfaces/datosApuesta.interface';

import { useRuletaStore } from '@/stores/main.store';

import { guardarApuesta } from '@/services/apiService';

const ruletaStore = useRuletaStore();

const apuestaInicial: DatosApuesta = {
  nombre: '',
  color: 0,
  tipoNumero: 2,
  numero: 0,
  montoApuesta: ruletaStore.montoApuestaInicial,
};

const apuesta = ref<DatosApuesta>(apuestaInicial);

const emit = defineEmits(['girarRuleta']);

const jugar = async () => {
  if (isNaN(apuesta.value.montoApuesta) || apuesta.value.montoApuesta <= 0) {
    alert('Debe apostar un monto mayor a cero');
    return false;
  }
  const { status } = await guardarApuesta(apuesta.value);

  if (status !== 200) {
    return false;
  }
  emit('girarRuleta');
};
</script>
