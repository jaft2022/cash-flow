<script  lang="ts">
import Layout from './Layout.vue';
import TheHeader from './TheHeader.vue';
import Resume from './Resume/Index.vue';
import Movements  from './Movements.vue';
import Action  from './Action.vue';


import { ref } from 'vue'
import Graphic from './Resume/Graphic.vue';

import { useStore } from '../stores/cash.js';
import { storeToRefs } from 'pinia';

export default {
  name: 'HomeComponent',
    components:{
      Layout,
      TheHeader,
      Resume,
      Movements,
      Action,
      Graphic

    },
  setup() {
    const amount = ref<null | number>(null)

    const store = useStore()
    const {movements} = storeToRefs(store);
    const dateSelected = ref<null | Date | string>(null)

    console.log("Movemnts: ",movements);
    return {
      amount,
      dateSelected,
      movements,
      store,
    }
  },
  
  methods:{
    create(movement:any){
      this.store.createMovement(movement);
    },
    remove(id:number){
      const index = this.movements.findIndex((m:any) => m.id === id);
      this.movements.splice(index, 1);
    },
    select(el:any, index:number){
      console.log("Select: el", el)
      console.log("Select: index", index)
      this.amount = el;
      this.dateSelected = this.movements[index -1]?.time;
    }
  },
  mounted(){
    this.movements = this.movements.map( (m:any) => {
      return {...m, time: new Date(m.time)}
    })
  },
  computed: {
    totalAmount(){
      return this.movements.reduce((suma, m) => {
        return suma + m.amount
      }, 0)
    }
  }
}
    
/* defineProps<{ msg: string }>() */

</script>

<template>
  <Layout>
    <template #header>
      <TheHeader>
      </TheHeader>
    </template>
    <template #resume>
      <Resume 
        label="Ahorro Total"
        :date-selected="dateSelected"
        :total-amount="totalAmount"
        :amount="amount"
      >
        <template #graphic>
          <Graphic @select="select"/>
        </template>
        <template #action>
          <Action @create="create"/>
        </template>
      </Resume>
    </template>
    <template #movements>
      <Movements @remove="remove"/>
    </template>
  </Layout>
</template>


