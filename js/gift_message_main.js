var vm = new Vue({
    el: '.container',
    data: {
        stampType: true,
        brandName: '브랜드명',
        presenter: '홍길동',
        imgUrl: 'images/product_item_04.jpg',
        giftName: '3천원 할인권',
        giftNum: '8033 0204 5002',
        giftValidity: '2018.12.31까지',
        barCodeSrc: 'images/bar_code.png',
        popdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''

        }
        ,popformdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''
            ,alertCall_1 : null
            ,alertCall_2 : null
            ,cancelShow : true

        }
        ,loading_type : false
    },
    filters:{

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params(that);

    },
    methods: {

        ticket_info : function(){

            var that = this;

            var param = {};

            param.ticketNo = that.key_ticketNo;

            //stamp barcode 유형

            BM.TICKET_INFO( param , function( res ){

                console.log(res);

            },function( code , msg ){



            });

        }

    }

});