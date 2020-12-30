const app = Vue.createApp({
    data() {
        return {
            title: "Contador App - Vue",
            count: 0,
        };
    },

    methods: {
        decreaseCount(){
            this.count -= 1;
        },

        addCount(){
            this.count += 1;
        }
    }
})