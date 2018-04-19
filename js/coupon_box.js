var vm = new Vue ({
    el:".container",
    data: {
        menuIdx: 0,
        menuList: [
            {
                name: '홈'
            },
            {
                name: '태마1'
            }
        ],

        productList: [
            {
                productHref: 'coupon_details.html',
                productImg: 'images/product_item_01.jpg',
                couponDisable: true,
                isPast: true,
                brandName: 'Brand name',
                productName: 'product nameproduct nameproduct nameproduct nameproduct name',
                priceAfter: '3500'
            },
            {
                productHref: 'coupon_details.html',
                productImg: 'images/product_item_02.jpg',
                couponDisable: true,
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'coupon_details.html',
                productImg: 'images/product_item_03.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'coupon_details.html',
                productImg: 'images/product_item_04.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            }
        ],

        historyList: [
            {
                productName: '스타벅스코리아 아이스아메리카노 1+1 SET 스타벅스코리아 아이스아메리카노 1+1 SET',
                useDate: '2018. 06. 21  21:00',
                usePoint: 30000,
                status: '선물취소'
            },
            {
                productName: '스타벅스코리아 아이스아메리카노 1+1 SET',
                useDate: '2018. 06. 21  21:00',
                usePoint: -30000,
                status: '선물'
            },
            {
                productName: '스타벅스코리아 아이스아메리카노 1+1 SET',
                useDate: '2018. 06. 21  21:00',
                usePoint: -2230000,
                status: '구매'
            },
            {
                productName: '스타벅스코리아 아이스아메리카노 1+1 SET',
                useDate: '2018. 06. 21  21:00',
                usePoint: -230000,
                status: '현장사용'
            },
        ],
    },
    filters:{
        formatPoint:function(value,unit){
            unit = 'P';
            if(value>0) {
                return '+' + parseInt(value).toLocaleString() + unit;
            }else {
                return parseInt(value).toLocaleString() + unit;
            }

        }
    },
    mounted: function() {
        this.$nextTick(function() {

        })
    },
    computed: {

    },
    methods: {

    }
});

