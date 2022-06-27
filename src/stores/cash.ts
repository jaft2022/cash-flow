import { defineStore, mapActions } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('cash', {
  
    
  // other options...
   state: () => {
    return {
      // all these properties will have their type inferred automatically
      /**
     * Add item to the movements
     */
      movements: []
      
    }
  },
  actions:{
    createMovement(movement){
      this.movements.push(movement);
    },
    
    
  },
  persist: true,
})
