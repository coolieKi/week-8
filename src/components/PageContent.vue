<template>
    <div id="itemsList">
        <div class="navbar">
        <nav>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>

        </ul>
        </nav>
        </div>
        
        <ul>
            <li v-for="item in items" :key="item.id">
                <p id="itemName">{{item.name}}</p> 
                <br>
                <img v-bind:src="item.imageURL"/> 
                <br>
                <p id="price">${{item.price}}</p>
                <countButton v-bind:item="item" v-on:counter="onCounter" id="button"></countButton>
            </li>
        </ul>

        <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"/>

    </div>
</template>


<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'


export default {
    components: {
        countButton: QuantityCounter,
        basket: Basket,
    },
    
    data() {
        return {
            items:[],
            itemsSelected:[],
        }
    },

    methods: {
        onCounter: function (item, count) {
        if (this.itemsSelected.length === 0 && count > 0) {
            this.itemsSelected.push([item.name, count, item.price])
        } else {
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const item_name = curr_item[0]
                if (item_name == item.name && count > 0) {
                    var updated = [item.name, count, item.price]
                    this.itemsSelected.splice(i, 1, updated);
                    break
                } else if (item_name == item.name && count == 0) {
                    this.itemsSelected.splice(i, 1)
                    break
                } else if (i == this.itemsSelected.length - 1 && count > 0) {
                    this.itemsSelected.push([item.name, count, item.price])
                    break
                } else {
                    continue
                }
            }
            console.log(this.itemsSelected)
        }
    },
        fetchItems: function(){
            database.collection('menu').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
            this.items.push(doc.data())
            });
        });
    }
  },

  created() {
    this.fetchItems()
    },
}
</script>


<style>

#itemsList {
  width: 100%;
  max-width:70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 74%;
}

#button {
    margin: auto;
    width: 45%
}

</style>