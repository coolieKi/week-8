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
        </div>
        
        <div>
            <ul>
                <li id="orderCol" v-for="order in orders" :key="order.key">
                    <div id="buttonCol">
                    <button v-on:click="deleteItem($event)" v-bind:id="order[0]">Delete</button>
                    <button v-on:click="route($event)" v-bind:id="order[0]">Modify</button>
                    </div>
                    <span v-for="item in order[1]" :key="item.key"> 
                        {{item.name}} {{item.count}} <br>
                    </span>

                </li>
            </ul>
        </div>

   </div>
</template>

<script>
import database from './firebase.js'

export default {

    data() {
        return {
            orders: [],
        }
    },

    methods: {
        fetchItems: function(){
            database.collection('orders').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.orders.push([doc.id, doc.data()])
                });
            });
        },
        deleteItem: function(event){
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => location.reload())
        },

        route: function(event){
            var doc_id = event.target.getAttribute("id"); 
            this.$router.push({
                name: 'modify',
                params: {data: doc_id}
            });
        }

    },

  created() {
    this.fetchItems()
    },
}

</script>

<style scoped>

    #orderCol {
        float:left;

    }

    #buttonCol {
        float: right;
        height:100%;
        margin: 10px;
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

    button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
    }
</style>