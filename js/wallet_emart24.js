var vm = new Vue({
    el: '.container',
    data: {
        navTitle: '이마트24'

    },

    mounted: function() {
        this.$nextTick(function() {
            this.onReady = !this.onReady;



        })
    },
    methods: {

    }

});