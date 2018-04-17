var vm = new Vue({
    el: '.container',
    data: {
        navTitle: '이마트24',
        shopSrc: 'images/submain_shop01.png',
        backgroundColor: '#FBDA33',
        hasMap: false
    },

    mounted: function() {
        this.$nextTick(function() {
            this.onReady = !this.onReady;



        })
    },
    methods: {

    }

});