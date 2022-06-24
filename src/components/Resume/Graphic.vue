<template>
  <div class="content__graphic">
    <svg
        @touchstart="tapTouch"
        @touchmove="tap"
        @touchend="unTap" 
        viewBox="0 0 300 200">
      <line
        stroke="#c4c4c4"
        stroke-width="2"
        x1="0"
        :y1="zero"
        x2="300"
        :y2="zero"
      />
      <polyline
        fill="none"
        stroke="#0688B0"
        stroke-witdh="2"
        :points="points"
      />
      <line
        v-show="showPointer"
        stroke="#04b500"
        stroke-width="2"
        :x1="pointer"
        y1="0"
        :x2="pointer"
        y2="200"
      />
    </svg>
    <p>Ultimos 30 días</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from '../../stores/cash';
import { storeToRefs } from 'pinia';
export default {
  emits: ['select'],
  setup(_, {emit}) {
     const store = useStore()
    const {movements} = storeToRefs(store);
    const showPointer = ref(false);
    const pointer = ref(0);


    function amounts(){
      const lastDays = movements.value.filter((movement) => {
      const today = new Date();
      const oldDate = today.setDate(today.getDate() - 30);
        return new Date(movement.time) > oldDate;
      })
      .map((m) => m.amount);
      return lastDays.map((m, i) => {
        const lastMovements = lastDays.slice(0, i + 1);
 
        return lastMovements.reduce((suma, movement) => {
          return suma + movement
        },0)
      })
    }
    watch(pointer, (value) => {
      const index = Math.ceil((value / (300 / amounts().length)));
      if(index < 0 || index > amounts().length) return;

      emit('select', amounts()[index - 1])

    })
    function amountToPixels(amount) {
      const min = Math.min(...amounts());
      const max = Math.max(...amounts());
      const amountAbs = amount + Math.abs(min);
      const minMax = Math.abs(max) + Math.abs(min);

      return 200 - ((amountAbs * 100) / minMax) * 2;
    }
    const tapTouch = ({target, touches}) =>{
        showPointer.value = true;
        const elementWidth = target.getBoundingClientRect().width;
        const elementX = target.getBoundingClientRect().x;
        const touchX = touches[0].clientX
        pointer.value= ((touchX - elementX) * 300) / elementWidth;
    }
    const unTap = () => {
        showPointer.value = false;
    }

    return {
      showPointer,
      pointer,
      movements,
      //funcs
      amounts,
      amountToPixels,
      tapTouch,
      unTap,

    };
  },
  computed: {
    zero(){
        return this.amountToPixels(0);
    },
    points() {
      const total = this.amounts().length;
      return this.amounts()
        .reduce((points, amount, i) => {
          const x = (300 / total) * (i + 1);
          const y = this.amountToPixels(amount);
          return `${points} ${x},${y}`;
        }, `0, ${this.amountToPixels(this.amounts.length ? this.amounts[0] : 0)}`);
    },
  },
};
</script>

<style scoped>
.content__graphic{
    width: 300px;
}
</style>