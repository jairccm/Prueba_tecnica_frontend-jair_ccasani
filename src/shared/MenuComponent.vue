<template>
  <div class="navbar bg-base-300 mb-5">
    <div class="flex">
      <a class="btn btn-ghost text-xl">JUEGO DE LA RULETA</a>
    </div>
    <div class="navbar-end">
      <a
        >USUARIO ACTIVO : <span class="ms-2">{{ usuario.nombre }}</span></a
      >
      <span class="mx-5">|</span>
      <a
        >SALDO : <span class="ms-2 badge-info px-3 py-2">{{ usuario.monto }}</span></a
      >
    </div>

    <div class="navbar-end">
      <BuscarUsuario></BuscarUsuario>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BuscarUsuario from '@/modules/ruleta/components/BuscarUsuarioComponent.vue';
import { useRuletaStore } from '../stores/main.store';

const ruletaStore = useRuletaStore();
const usuario = ruletaStore.usuario;
</script>
