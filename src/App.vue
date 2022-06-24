<script lang="ts">
import SplashScreen from "./components/SplashScreen.vue";
import HomeComponent from "./components/HomeComponent.vue";
import { ref } from 'vue';

export default {
  components: {
    SplashScreen,
    HomeComponent
  },
  setup(){
    const showSplash = ref(true)
    return {
      showSplash
    }
  },
  mounted( ) {
    setTimeout(() => {
      this.showSplash = false 
    }, 500)
  }
}

</script>

<template>
  <Transition name="cash">
    <SplashScreen v-if="showSplash" />
  </Transition>
    <HomeComponent v-if="!showSplash" />
</template>


<style>

html,
body,
.app {
  min-height: 100vh;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
* {
  --brand-green: #04b500;
  --brand-blue: #0689b0;
}

.cash-enter-active, .cash-leave-active {
  transition: opacity 1s;
}
.cash-enter, .cash-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>