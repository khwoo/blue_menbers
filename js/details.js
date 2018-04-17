var vm = new Vue({
   el: '.container',
   data: {
       navTitle: 'Golf',

       productImg: 'images/item_product_detail.png',
       brandName: '플라자 CC',
       productName: '플라자CC용인 5만원권',
       productNotice: '2018년12월 25일까지 구매가능',
       priceAfter: '50000',

       subMenuIdx: 0,
       subMenuList: [
           {name: '상품안내'},
           {name: '구매정보'},
           {name: '가맹점정보'}
       ],
       subContentList: [
           {
               contentText: '플라자CC 용인에서 이용요금 결제 시 5만원 할인 <br/>' +
               '받을 수 있는 쿠폰입니다. <br/>' +
               '블루멤버스 포인트 5만점이 차감됩니다.<br/>' +
               '현장에서 쿠폰상세화면을 제시하면 사용확인을 진행합니다.'
           },
           {
               contentText: '구매정보'
           },
           {
               contentText: '가맹정보'
           }
       ],

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
       alertContent: ''
   },
    filters:{
        formatMoney:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.totalPrice = this.priceAfter*this.productQuantity
        })
    },
    methods: {
        tap_plus: function() {
            if(this.productQuantity<this.maxProductQuantity) {
                this.productQuantity ++;
                this.totalPrice = this.priceAfter*this.productQuantity
            }
        },
        tap_minus: function() {
            if(this.productQuantity>1) {
                this.productQuantity --;
                this.totalPrice = this.priceAfter*this.productQuantity
            }
        },
        tap_buy: function() {
            if(this.btnOptionShow==false) {
                this.btnOptionShow = true
                this.giftHref = 'gift.html'
            }else {
                this.alertShow = true
                this.giftHref = 'javascript:void(0)'
            }
        },
        tap_gift: function() {
            if(this.btnOptionShow==false) {
                this.btnOptionShow = true
                this.giftHref = 'gift.html'
            }else {
                this.giftHref = 'javascript:void(0)'
            }
        },
        tap_cancel: function() {
            this.alertShow = false
            this.btnOptionShow = false
        },
        tap_buyConfirm: function() {
            this.alertShow = false
            this.alertOption = true
            this.btnOptionShow = false
            if(this.buySuccess == true) {
                this.alertTitle = '구매완료'
                this.alertContent = '구매가 완료되었습니다.<br/>' +
                    '구매한 상품은 보관함에서 확인할 수 <br/>있습니다.'

            }else{
                this.alertTitle = '구매실패'
                this.alertContent = '포인트가 부족합니다.<br/>' +
                    '블루멤버스 포인트를 확인후 다시 <br/>진행해주세요.'
            }
        },
        tap_buyOptionConfirm: function() {
            this.alertOption = false
        }
    }

});