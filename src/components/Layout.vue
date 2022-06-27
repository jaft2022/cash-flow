<template>
  <div class="header">
      <slot name="header"></slot>
  </div>
  <div class="resume">
      <slot name="resume"></slot>
  </div>
  <div class="movements">
      <div class="head" @click="showMovements = !showMovements">
          <div class="grip"></div>
      </div>
  <Transition name="movements-body">
      <div class="body" v-show="showMovements">
        <slot name="movements"></slot>
      </div>
  </Transition>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default{
  setup(){
    const showMovements = ref(false);
    return {
      showMovements
    }
  }
}

</script>

<style scoped>
.header,
.resume,
.movements {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 0;
  box-sizing: border-box;
}
.header {
  position: fixed;
  width: 100vw;
}
.resume {
  min-height: 100vh;
}
.movements {
  z-index: 1;
  position: absolute;
  flex-direction: column;
  bottom: 0;
  width: 100vw;
  background-color: white;
  box-shadow: 0 -8px 16px #e5e5e5;
  border-radius: 24px;
}
.movements .head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}
.movements .body {
  width: 100%;
  height: 75vh;
}
.movements .head .grip {
  width: 120px;
  height: 8px;
  background-color: #e5e5e5;
  border-radius: 4px;
}

.movements-body-enter-active,
.movements-body-leave-active {
  transition: all 0.8s;
  max-height: 75vh;
}
.movements-body-enter-from,
.movements-body-leave-to
{
  transition: all 0.8s;
  opacity: 0;
  max-height: 0vh;
}
</style>
