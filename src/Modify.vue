<template>
    <div id="modify">
        <ul v-for="data in datapacket" :key="data.key">
            <li v-for="(item, index) in data" :key="item.key">
                {{item.name}}: {{item.count}} <br>
                <h5 v-show="hidden">index</h5>
                <input v-bind:id=index placeholder=0 type="number" min="0">
            </li>
            <button v-on:click="updateOrder()">Update Order</button>
        </ul>
    </div>
</template>


<script>
import database from './firebase.js'

export default {

    props: ['data'],

    data() {
        return {
            datapacket:[],
            hidden: false,
        }
    },
    methods: {
        fetchItems: function(){
            database.collection('orders').doc(this.data).get().then(item => this.datapacket.push(item.data()))
        },
        updateOrder: function(){
            let copiedData = Object.assign({}, this.datapacket);
            var dataList = copiedData[0];

            for (let i=1; i<=6; i++) {
                var id = "order" + i;
                if (document.getElementById(id).value !== null && document.getElementById(id).value !== "") {
                    dataList[id].count = document.getElementById(id).value;    
                }
            }
            console.log(dataList);

            database.collection('orders').doc(this.data).set(copiedData[0]).then(() => this.$router.push({
                path: '/orders'
            }));
        }
    },

    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>

#modify {
    display: flex;
    position: absolute;
    left:5px;
    flex-direction: column;
    flex-wrap: wrap;
}

ul {
    width:100px;
    height:100px;
    margin: auto;
    border-style: none;
}

span, li {
    text-align: left;
    border-style: none;
}

button {
    position: relative;
    left: 10px;
}

</style>