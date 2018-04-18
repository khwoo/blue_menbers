var vm = new Vue({
   el: '.container',
   data: {
       navTitle: '상품상세',
       main_url : '',
       productImg: '',
       brandName: '',
       productName: '',
       productNotice: '',
       priceAfter: '',
       subMenuIdx: 0,
       subMenuList: [
           {name: '상품안내'},{name: '구매정보'},{name: '가맹점정보'}
       ],
       subContentList: [],
       btnOptionShow:false,
       productQuantity: 1,
       maxProductQuantity: 10, /* 최대 구매 수량 */
       totalPrice: 0,

       /* 구매 alert */
       alertShow: false,
       giftHref: 'javascript:void(0)',
       /* 구매서공, 구매실패, 선물성공 alert */
       alertOption: false,
       alertTitle: '',
       prstPsbYn : 'Y',
       loading_type : false,
       alertContent: ''

   },
    filters:{
        formatMoney:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    created : function(){
        var that = this;
    },
    mounted: function() {

       var that = this;
       that.$utils_location_params( that );

       that.main_url = [
           'main.html'
           ,'?'
           ,'key_custNo=' + that.key_custNo
       ].join('');

        that.productDetailsData();

        //

        this.$nextTick(function() {
            this.totalPrice = this.priceAfter*this.productQuantity
        })
    },
    methods: {

       //상품 상세 정보
       productDetailsData : function() {
           var that = this;

           var param = {};
           param.goodsCd = that.key_productId;
           BM.SAL_GOODS_DTL_INFO( param , function(res){
                console.log(res);
               that.productImg = res.goodsDtlImgs[0].goodsDtlImg;
               that.brandName = res.brdNm;
               that.productName = res.goodsNm;
               that.productNotice = that.$utils_date( res.salEndDt , '년' , '월 ' , '일까지 구매가능' );
               that.priceAfter = res.goodsSalPrice;
               that.totalPrice = res.goodsSalPrice;
               that.prstPsbYn = res.prstPsbYn;

               that.subContentList.push({
                   contentText : res.goodsDesc1
               });

               that.subContentList.push({
                   contentText : res.useDesc
               });

               that.subContentList.push({
                   contentText : res.brdDesc
               });


           },function( code , msg ){

               console.log( code , msg );

           });


        }
        //상품 구매
        ,product_order : function( callback ){
            var that = this;

            var param = {};
            param.custNo = that.key_custNo;
            param.goodsCd = that.key_productId;
            param.ordQtt = that.productQuantity;
            param.ordGbn = '1';

            BM.ORDER( param , function( res ){

                that.alertTitle = '구매완료';
                that.alertContent = '구매가 완료되었습니다.<br/>' +
                                    '구매한 상품은 보관함에서 확인할 수 있습니다.';
                return callback();

            },function( code , msg ){

                that.alertTitle = '구매실패';
                that.alertContent = msg;

                return callback();

            });
        }

        ,tap_plus: function() {
            var that = this;
            if(that.productQuantity<that.maxProductQuantity) {
                that.productQuantity ++;
                that.totalPrice = that.priceAfter*that.productQuantity
            }
        },

        tap_minus: function() {
            var that = this;
            if(that.productQuantity>1) {
                that.productQuantity --;
                that.totalPrice = that.priceAfter*that.productQuantity
            }
        },
        //구매
        tap_buy: function() {
            var that = this;

            if(that.btnOptionShow==false) {
                that.btnOptionShow = true;
                that.totalPrice = that.priceAfter;
                //상품 구매 건수 초기화
                that.productQuantity = 1;
            }else {
                that.alertShow = true;
            }

        },
        //선물
        tap_gift: function() {
            var that =this;

            if(that.btnOptionShow==false) {
                that.btnOptionShow = true;
                //상품 선물 건수 초기화
                that.totalPrice = that.priceAfter;
                that.productQuantity = 1;
            }else {
                location.href = that.gift_url();
            }

        },
        //선물 페이지 url 설정.
        gift_url : function(){
            var that= this;
            var _url = [
                'gift.html'
                ,'?'
                ,'custNo=' + that.key_custNo
                ,'&'
                ,'productId=' + that.key_productId
                ,'&'
                ,'count=' + that.productQuantity
                ,'&'
                ,'totalprice=' + that.totalPrice
            ].join('');

           return _url;

        },

        tap_cancel: function() {
            var that = this;

            that.alertShow = false;
            that.btnOptionShow = false;

        },
        //구매 확인
        tap_buyConfirm: function() {
            var that = this;

            that.loading_type = true;
            that.alertShow      = false;

            that.product_order(function(){

                that.loading_type = false;

                that.alertOption    = true;
                that.btnOptionShow  = false;

            });

        },
        tap_buyOptionConfirm: function() {
           //보관함 이동.
            this.alertOption = false;
        }
    }

});