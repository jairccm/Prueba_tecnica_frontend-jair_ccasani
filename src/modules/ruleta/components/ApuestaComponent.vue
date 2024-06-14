<template>
  <div class="bg-white shadow-md rounded px-4 py-4">
    <div class="stats stats-vertical w-full lg:stats-horizontal shadow">
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
      </div>
      <div class="stat">
        <div class="stat-title">Seleccionar color</div>
        <div class="stat-value">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text text-red-500">Rojo</span>
              <input
                type="radio"
                name="radio-10"
                v-model="apuesta.color"
                value="0"
                class="radio checked:bg-red-500"
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
              />
            </label>
          </div>
        </div>
      </div>
    </div>

    <div role="tablist" class="tabs tabs-bordered py-10">
      <input
        type="radio"
        name="tab_apuestas"
        role="tab"
        class="tab checked:text-blue-500 checked:font-bold"
        aria-label="Añadir Apuesta tipo Numero"
        value="TIPO_NUMERO"
        v-model="tabApuestas"
      />
      <input
        type="radio"
        name="tab_apuestas"
        role="tab"
        class="tab checked:font-bold"
        aria-label="Ninguno"
        value="NINGUNO"
        v-model="tabApuestas"
      />
      <input
        type="radio"
        name="tab_apuestas"
        role="tab"
        class="tab checked:text-green-500 checked:font-bold"
        aria-label="Añadir Apuesta Numero"
        value="NUMERO"
        v-model="tabApuestas"
      />
    </div>
    <div class="grid justify-center" v-if="tabApuestas !== 'NINGUNO'">
      <div class="stat w-2/4" v-if="tabApuestas === 'TIPO_NUMERO'">
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
              />
            </label>
          </div>
        </div>
      </div>

      <div class="stat w-2/4" v-if="tabApuestas === 'NUMERO'">
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
      </div>
    </div>

    <div class="grid">
      <div class="" style="text-align: end">
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success" @click="jugar">
          JUGAR
        </button>
        <span class="mx-4"></span>
        <button
          v-if="ruletaStore.showButtonGuardarResultado"
          class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent"
          @click="guardarDatos"
        >
          GUARDAR DATOS
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, watch } from 'vue';
import router from '@/router';

import type { DatosApuesta } from '@/modules/interfaces/datosApuesta.interface';
import type { Usuario } from '@/modules/interfaces/usuario.interface';

import { useRuletaStore } from '@/stores/main.store';
import { guardarApuesta, guardarDatosUsuario } from '@/services/apiService';

const tabApuestas = ref('NINGUNO');
const ruletaStore = useRuletaStore();
const apuestaInicial: DatosApuesta = {
  nombre: '',
  color: 0,
  tipoNumero: -1,
  numero: -1,
  montoApuesta: ruletaStore.montoApuestaInicial,
};
const apuesta = ref<DatosApuesta>(apuestaInicial);

watch(tabApuestas, (nuevoValor) => {
  switch (nuevoValor) {
    case 'NUMERO':
      apuesta.value.numero = 0;
      apuesta.value.tipoNumero = -1;
      break;

    case 'TIPO_NUMERO':
      apuesta.value.tipoNumero = 0;
      apuesta.value.numero = -1;
      break;

    default:
      apuesta.value.tipoNumero = -1;
      apuesta.value.numero = -1;
      break;
  }
});

const emit = defineEmits(['girarRuleta']);

const jugar = async () => {
  if (ruletaStore.usuario.monto === 0) {
    alert('No dispone de saldo suficiente para jugar!\n recargue su saldo para seguir jugando');

    if (confirm('Desea volver a la pagina anterior para recargar su saldo?')) {
      router.push({ path: '/' });
    }

    return false;
  }

  if (isNaN(apuesta.value.montoApuesta) || apuesta.value.montoApuesta <= 0) {
    alert('Debe apostar un monto mayor a cero');
    return false;
  }

  if (apuesta.value.montoApuesta > ruletaStore.usuario.monto) {
    alert('El monto de la apuesta no puede ser mayor al saldo.');
    return false;
  }

  ruletaStore.showButtonGuardarResultado = false;

  const apuestaDto: DatosApuesta = {
    nombre: apuesta.value.nombre,
    color: Number(apuesta.value.color),
    tipoNumero: Number(apuesta.value.tipoNumero),
    numero: apuesta.value.numero,
    montoApuesta: apuesta.value.montoApuesta,
    apuestaAdicional: tabApuestas.value,
  };

  const { status } = await guardarApuesta(apuestaDto);

  if (status !== 200) {
    return false;
  }
  emit('girarRuleta');
};

const guardarDatos = async () => {
  const usuarioData: Usuario = {
    existeUsuario: ruletaStore.usuario.existeUsuario,
    monto: ruletaStore.usuario.monto,
    nombre: ruletaStore.usuario.nombre,
  };

  if (usuarioData.nombre == '') {
    const nombre = prompt('Coloque su nombre para guardar su datos');
    if (nombre) {
      usuarioData.nombre = nombre;
    } else {
      alert('No coloco ningun nombre');
      return false;
    }
  }

  const { status, data } = await guardarDatosUsuario(usuarioData);

  if (status !== 200) {
    alert('Ocurrio un error al guardar datos');
  } else {
    ruletaStore.usuario.nombre = usuarioData.nombre;
    ruletaStore.usuario.existeUsuario = true;
    ruletaStore.usuario.monto = usuarioData.monto;
    ruletaStore.juegoGuardado = true;

    alert('Se actualizaron los datos');
  }
};
</script>
