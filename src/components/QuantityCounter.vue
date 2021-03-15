<template>
    <div>
        <button v-on:click="decrement">-</button> <h1> {{counter}} </h1>
        <button v-on:click="increment">+</button>

    </div>
</template>


<script>
    export default {

        props: {
            item: {
                type: Object
            }
        },

        data() {
            return {
                counter: 0
            }
        },

        methods: {
            increment: function(){
                if (this.counter == 10) {
                    alert("You cannot buy more than 10 items.")
                } else {
                    this.counter++
                    this.$emit('counter', this.item, this.counter)
                }
            },

            decrement: function(){
                if (this.counter == 0) {
                    console.log("It cannot be Negative")
                } else {
                    this.counter--
                    this.$emit('counter', this.item, this.counter)
                }
            }
        }
    }

</script>


<style scoped>
    button {
        float: left;
        text-align: center;
        width: 60px;
        height: 60px;
        font-size: 30px;
        color: white;
        text-decoration: bolder;
        background-color: #e0af1b;
        border: none
    }

    h1 {
        float: left;
        padding: 8px;
        margin: auto
    }
</style>