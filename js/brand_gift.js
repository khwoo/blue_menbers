var vm = new Vue ({
    el:".container",
    data: {
        brandName: 'Brand name',
        productList: [
            {
                productHref: 'details.html',
                productImg: 'images/product_item_01.jpg',
                brandName: 'Brand name',
                productName: 'product nameproduct nameproduct nameproduct nameproduct name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_02.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_03.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_04.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
        ]
    },
    filters:{
        formatPoint:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    mounted: function() {
        this.$nextTick(function() {

        })
    }
});

