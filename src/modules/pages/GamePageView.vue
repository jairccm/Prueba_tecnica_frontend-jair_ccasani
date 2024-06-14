<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="grid grid-cols-2 gap-3">
        <div><Apuesta @girarRuleta="girarRuleta"></Apuesta></div>
        <div>
          <Ruleta ref="ruleta"></Ruleta>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import router from '@/router';

import Apuesta from '@/modules/ruleta/components/ApuestaComponent.vue';
import Ruleta from '@/modules/ruleta/components/RuletaComponent.vue';
import { useRuletaStore } from '@/stores/main.store';

const ruletaStore = useRuletaStore();

const ruleta = ref<{ girarRuletaEvent: () => void } | null>(null);

const girarRuleta = () => {
  if (ruleta.value) {
    ruleta.value.girarRuletaEvent();
  }
};

onMounted(async () => {
  if (ruletaStore.usuario.monto === 0) {
    router.push({ path: '/' });
  }
});
</script>
