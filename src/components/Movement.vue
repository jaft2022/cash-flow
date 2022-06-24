<template>
  <div class="movement">
    <div class="content">
      <h4>{{ title }}</h4>
      <span>{{ timeFormat }}</span>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <img src="../assets/trash-icon.svg" alt="borrar" @click="remove" />
      <p :class="{ red: isNegative, green: !isNegative }">
        {{ amountCurrency }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default {
  name: "Movement",
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
    },
    time: {
      type: Date,
    },
  },
  setup(props, { emit }) {
    const { id, title, description, amount, time } = props;
    function remove() {
      emit("remove", id);
    }
    return {
      id,
      title,
      description,
      amount,
      time,
      //funcs
      remove,
    };
  },
  computed: {
    amountCurrency() {
      return currencyFormatter.format(this.amount);
    },
    isNegative() {
      return this.amount < 0;
    },
    timeFormat() {
      const date = new Date(this.time)
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
  },
};
</script>

<style scoped>
.movement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #e6f9ff;
  border-radius: 8px;
  box-sizing: border-box;
}
.movement .content {
  width: 100%;
}
.movement .action {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}
h4,
p {
  margin: 0;
  padding: 0;
}
h4 {
  margin-bottom: 8px;
}
.movement .action img {
  margin-bottom: 16px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>