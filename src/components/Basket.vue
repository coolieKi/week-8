<template>
    <div>
        <p>Menu:</p> 
        <ul>
            <li v-for="item in this.itemsSelected" v-bind:key="item.name">
            <p>{{item[0]}} x {{item[1]}}</p>    
            </li>
        </ul>
        <button v-on:click="findTotal(); sendOrder()">Calculate Total</button>
        <p v-show="show">Subtotal: ${{subtotal}}</p>
        <p v-show="show">Grand Total: ${{grandTotal}}</p>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    props:{
        itemsSelected: {
            type: Array
        }
    },

    data() {
        return {
            show: false,
            subtotal: 0,
        }
    },

    methods: {
        findTotal: function() {
            var subtotal = 0;
            for (const item of this.itemsSelected) {
                subtotal += (item[2] * item[1])
            }
            this.show = true;
            this.subtotal = subtotal;
        },

        sendOrder: function() {
            var orderList = {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun": 0,
                "Sambal KangKung": 0,
                "Pork Fried Rice": 0,
                "Mapo Tofu": 0,
                "Cereal Prawn": 0
            }

            for (let i = 0; i < this.itemsSelected.length; i++) {
                orderList[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
            }
           
            database.collection('orders').add({
                order1: {name:"Prawn omelette", count:orderList["Prawn omelette"]},
                order2: {name:"Dry Beef Hor Fun", count:orderList["Dry Beef Hor Fun"]},
                order3: {name:"Sambal KangKung", count:orderList["Sambal KangKung"]},
                order4: {name:"Pork Fried Rice", count:orderList["Pork Fried Rice"]},
                order5: {name:"Mapo Tofu", count:orderList["Mapo Tofu"]},
                order6: {name:"Cereal Prawn", count:orderList["Cereal Prawn"]}
            }).then(() => location.reload());
        } 
        /*sendOrder: function() {
            this.itemsSelected.forEach(function(item) {
                database.collection('orders').add({
                    name: item[0],
                    count: item[1],
                    price: item[2]
                });
            }).then(location.reload())
        }*/
    },

    computed: {
        grandTotal: function() {
            var grand = this.subtotal * 1.07
            return grand.toFixed(2)
        }
    }
   
}

</script>


<style>

    li {
        border-style: inset;

    }

    button {
        text-align: center;
        color: black;
        padding: 10px;
        font-weight: bold;
        text-decoration: bolder;
        background-color: #e0af1b;
        border: none
    }
</style>