<template>
  <div class="chart">
    <h1 id="chartTitle">Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#chartTitle {
    background-color: rgba(146,168,209,255);
    color: white;
    font-size: 40px;
    padding: 25px;
}
</style>