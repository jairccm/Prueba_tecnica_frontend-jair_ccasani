// src/composables/useDrawRoulette.ts
import { ref, onMounted } from 'vue';
import { obtenerResultado } from '@/services/apiService';
import { useRuletaStore } from '@/stores/main.store';
import Swal from 'sweetalert2';

interface Option {
  numero: number;
  color: string;
}

export function useDrawRoulette() {
  const options = ref<Option[]>([
    ...Array.from({ length: 37 }, (_, i) => ({
      numero: i,
      color: 'white',
    })),
  ]);
  const ctx = ref<CanvasRenderingContext2D | null>(null);
  const arc = Math.PI / (options.value.length / 2);
  let spinAngleStart: number = 0;
  let spinTime: number = 0;
  let spinTimeTotal: number = 0;
  let startAngle: number = 0;
  let spinTimeout: any;

  const ruletaStore = useRuletaStore();

  const dibujarRuleta = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const bordeExternoCirc = 200;
    const bordeInternoCirc = 90;
    const textRadius = 160;

    const context = canvas.getContext('2d');
    if (!context) return;

    ctx.value = context;
    ctx.value.clearRect(0, 0, 400, 400);
    ctx.value.strokeStyle = 'black';
    ctx.value.lineWidth = 3;
    ctx.value.font = 'bold 14px';

    options.value.forEach((option, i) => {
      const angle = startAngle + i * arc;
      ctx.value!.fillStyle = option.color;

      // Fill background colors
      ctx.value!.beginPath();
      ctx.value!.arc(250, 250, bordeExternoCirc, angle, angle + arc, false);
      ctx.value!.arc(250, 250, bordeInternoCirc, angle + arc, angle, true);
      ctx.value!.stroke();
      ctx.value!.fill();
      ctx.value!.save();

      // Draw text

      ctx.value!.fillStyle = option.color != 'white' ? 'white' : 'black';
      ctx.value!.translate(
        250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius,
      );
      ctx.value!.rotate(angle + arc / 2 + Math.PI / 2);

      const text = option.numero.toString();
      ctx.value!.fillText(text, -ctx.value!.measureText(text).width / 2, 0);

      ctx.value!.restore();
    });
  };

  const girarRuleta = async () => {
    limpiarUlitomoResultado();
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = 5000;
    rotarCirculo();
  };

  const rotarCirculo = () => {
    spinTime += 30;

    if (spinTime >= spinTimeTotal) {
      detenerRotacion();
      return;
    }
    const spinAngle = spinAngleStart - calcular(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    dibujarRuleta(canvas);

    spinTimeout = setTimeout(() => rotarCirculo(), 30);
  };

  const detenerRotacion = async () => {
    clearTimeout(spinTimeout);

    obtenerResultado()
      .then((response) => {
        const { status, data } = response;
        if (status !== 200) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log(data);
        return data;
      })
      .then(({ numero, premio }) => {
        options.value[numero.numero].color = numero.color;
        const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
        dibujarRuleta(canvas);
        if (!premio.ganaPremio) {
          Swal.fire({
            icon: 'error',
            title: `<span style="color:red">No hay Premio, Sigue intentando!</span>`,
            html: `Numero : ${numero.numero}<br>
                   Color  : ${numero.color == 'red' ? 'ROJO' : 'NEGRO'}<br>
                   Tipo   : ${numero.numero % 2 == 0 ? 'PAR' : 'IMPAR'}<br>
                  <span style="color:red"> Monto Perdido: ${premio.montoPremio}</span>
                   `,
            footer: '',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: `<span style="color:green"> Felicidades Has ganado!</span>`,
            html: `Numero : ${numero.numero} <br>
                   Color  : ${numero.color == 'red' ? 'ROJO' : 'NEGRO'}<br>
                   Tipo   : ${numero.numero % 2 == 0 ? 'PAR' : 'IMPAR'}<br>
                   <span style="color:green">Monto Premio: ${premio.montoPremio}</span>
                   `,
            footer: '',
          });
        }
        ruletaStore.montoPremio = premio.montoPremio;
        ruletaStore.usuario.monto += premio.montoPremio;
        ruletaStore.showButtonGuardarResultado = true;
      })
      .catch((error) => alert('A ocurrido un error en el resultado de la ruleta'));
  };

  const limpiarUlitomoResultado = () => {
    options.value = [
      ...Array.from({ length: 37 }, (_, i) => ({
        numero: i,
        color: 'white',
      })),
    ];
  };

  onMounted(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    dibujarRuleta(canvas);
  });

  return {
    dibujarRuleta,
    girarRuleta,
  };
}

const calcular = (t: number, b: number, c: number, d: number) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
};
