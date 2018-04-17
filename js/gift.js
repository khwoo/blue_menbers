var vm = new Vue({
    el: '.container',
    data: {
        navTitle: 'Golf',
        totalQuantity: 1,
        totalPrice: 50000,

        alertShow: false,
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

        })
    },
    methods: {
        tap_buy: function() {
            this.alertShow = true
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