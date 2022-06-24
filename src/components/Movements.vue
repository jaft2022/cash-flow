<template>
  <div class="movements">
    <h2 class="title">Historial</h2>
    <div class="content">
      <Movement 
        v-for="{id, title, description, amount, time} in movements" 
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :time="time"
        :amount="amount"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Movement from './Movement.vue'
import { useStore } from '../stores/cash.js';
import { storeToRefs } from 'pinia';

  export default {
    name: 'Movements',
    emits:['remove'],
    components:{
      Movement,
    },
    props: {
      movements: {
        type: Array,
        default: () => [],
      }
    },
    setup(_,{emit}){
      const store = useStore();
      const {movements} = storeToRefs(store);

      const remove = (id:number) => {
        emit("remove", id)
      }
      return {
        movements,
        //funcs
        remove
      }
    }
  }

</script>

<style scoped>
.movements {
  max-height: 100%;
  padding: 0 8px;
  margin-bottom: 14px;
}
.title {
  margin: 8px 16px 24px 16px;
  color: var(-–brand-blue);
}
.content {
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
}
</style>