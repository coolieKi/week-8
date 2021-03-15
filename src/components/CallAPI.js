import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datagroup:[],
        datacollection: {
            labels:[],
            datasets: [
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderWidth:0.5,
                    borderColor: 'rgba(250,1,2,255)'
            },
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(0,144,204,255)'
            },
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderColor:'rgba(87,98,153,255)'
            },
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderColor:'rgba(12,157,198,255)'
            },
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderColor:'rgba(166,135,157,255)'
            },
                { 
                    label:'',
                    data: [],
                    fill: false,
                    borderColor:'rgba(155,243,175,255)'
            },
        ]
        },
        options: {
            legend: {display: true},
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
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
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            this.datagroup = response.data.items

            for(let key in this.datagroup){
                var psi = response.data.items[key]['readings']['psi_twenty_four_hourly']
                for(let i=0; i<=5; i++) {
                    var input = psi[Object.keys(psi)[i]]
                    this.datacollection.datasets[i].label = Object.keys(psi)[i]
                    this.datacollection.datasets[i].data.push(input)
                }
                
                var timestamp = response.data.items[key]['timestamp']
                this.datacollection.labels.push(timestamp)
                console.log(this.datacollection.labels)
            }
            this.renderChart(this.datacollection, this.options)
        })
            
    }
  },
  created() {
    this.fetchItems()
  }
}