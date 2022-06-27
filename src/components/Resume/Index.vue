<template>
    <main>
      <p>
        {{ timeFormat }}
      </p>
      <h1>{{ amountCurrency }}</h1>
      <div class="graphic">
        <slot name="graphic"></slot>
      </div>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </main>
</template>

<script lang="ts">
const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
}); 
export default {
  props: {
    label: {type: String},
    totalAmount: {type: Number},
    amount: {
      type: Number,
      default: null
      },
    dateSelected: {
      type: Date,
      default: null
      }
  },
  computed: {
    amountVisual():any {
      return this.amount !== null ? this.amount : this.totalAmount
    },
    timeFormat() {
      if(this.dateSelected === null) return this.label

      const date = new Date(this.dateSelected)
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour "0" should be "12"
      minutes = minutes < 10 ? 0 + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return (
        date.getDate() +
        "/" +
        new Intl.DateTimeFormat("en", { month: "short" }).format(date) +
        "/" +
        date.getFullYear() +
        " " +
        strTime
      );
    },
    
    amountCurrency(){
      return currencyFormatter.format(this.amountVisual)
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
h1,
p {
  margin: 0;
  text-align: center;
}
h1 {
  margin-top: 14px;
  color: var(--brand-green);
}
.graphic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
  box-sizing: border-box;
}
</style>