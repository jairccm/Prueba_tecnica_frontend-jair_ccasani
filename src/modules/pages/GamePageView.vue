<template>
  <div role="tablist" class="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="JUGAR RULETA" checked />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
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
import Apuesta from '@/modules/ruleta/components/ApuestaComponent.vue';
import Ruleta from '@/modules/ruleta/components/RuletaComponent.vue';
import { ref } from 'vue';

const ruleta = ref<{ girarRuletaEvent: () => void } | null>(null);

const girarRuleta = () => {
  if (ruleta.value) {
    ruleta.value.girarRuletaEvent();
  }
};
</script>
