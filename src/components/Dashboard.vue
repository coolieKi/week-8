<template>

<div>
    <div class="navbar">
    <nav>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li> 
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    </nav>

    <div id="chart">
        <bar-chart></bar-chart>
        
        <callapi></callapi>
    </div>

    </div>
</div>

</template>

<script>
import BarChart from '../charts/BarChart.vue'
import callAPI from './CallAPI.vue'

export default {
  name: 'app',
  components: {
    BarChart,
    callapi: callAPI,
  }
}
</script>

<style>
#chart {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>