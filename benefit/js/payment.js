
var vm = new Vue({
    el: '.container',
    data: {
        productUrl : 'product_list.html?'
    },

    created:function(){

        var that = this;

        that.$utils_link( that );

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params( that );

        that.productUrl = that.$utils_addPageParam( that , that.productUrl );

    },
    methods: {

        productlist:function () {

            var that = this;

            location.href = that.productUrl;

        }

    }

});