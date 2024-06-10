<template>
  <div class="roulette-container">
    <canvas id="canvas" ref="canvas" width="490" height="490"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useDrawRoulette } from '@/modules/ruleta/composable/UseDibujarRueta';

const canvas = ref<HTMLCanvasElement | null>(null);
const { dibujarRuleta, girarRuleta } = useDrawRoulette();

const girarRuletaEvent = () => girarRuleta();

defineExpose({ girarRuletaEvent });

onMounted(async () => {
  dibujarRuleta(canvas.value);
});
</script>
