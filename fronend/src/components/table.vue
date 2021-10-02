<template>
  <div id="table">
    <div @click="p()">data</div>
    <table>
      <tr>
        <th>Firstname</th>
        <th>Age</th>
      </tr>
      <tr v-for="(person, index) in tableData" :key="index">
        <td>{{ person.name }}</td>
        <td>{{ person.age }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { tableData } from "../assets/data.js";
export default {
  data() {
    return {
      tableData,
    };
  },
  methods: {
    p() {
      console.log(tableData);
    },
  },
};
</script>
