import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Quantity of Each Dish",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: {display: false},
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 0,
                  }
              }]
          },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {

    getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 1; i <= 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          for (let i =1; i<=Object.keys(doc.data()).length; i++) {
            var order = "order" + i;
            var name = doc.data()[order].name
            if (this.datacollection.labels.includes(name) == false) {
              this.datacollection.labels.push(name)
              var slot = this.datacollection.labels.indexOf(name)
              this.datacollection.datasets[0].data[slot] = parseInt(doc.data()[order].count)
              this.datacollection.datasets[0].backgroundColor.push(this.getRandomColor())
            } else {
              var slot2 = this.datacollection.labels.indexOf(name)
              this.datacollection.datasets[0].data[slot2] += parseInt(doc.data()[order].count)
            }
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created() {
    this.fetchItems()
  }
}