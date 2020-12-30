const app = Vue.createApp({
    data() {
        return {
            title: "Contador App - Vue",
            count: 0,
        };
    },

    methods: {
        decreaseCount(){
            console.log("decrease");
        },

        addCount(){
            console.log("add");
        }
    }
})