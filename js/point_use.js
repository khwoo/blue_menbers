var vm = new Vue({
    el: '.container',
    data: {
        navTitle: '포인트 사용하기',
        myPoint: 4000,
        noticeContent: '*이마트24 전 매장에서 사용가능<br/>' +
                        '*1일 2회, 최대 1만점까지 사용가능',
        pointList: [
            {
                usePoint: 1000
            },
            {
                usePoint: 3000
            },
            {
                usePoint: 5000
            },
            {
                usePoint: 10000
            }
        ],

        headerPoint: null,
        usePage: false,

        alertOption: false,
        alertTitle: '',
        alertContent: '',
        // buySuccess: null,
        buySuccess: true // 임시로 포인트 사용 성공
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
        tap_pointUse: function(index) {
            if(this.myPoint>=this.pointList[index].usePoint) {
                this.usePage = true
                this.headerPoint = this.pointList[index].usePoint
            }
        },

        tap_buyConfirm: function() {
            this.alertOption = true
            if(this.buySuccess == true) {
                this.alertTitle = ''
                this.alertContent = '블루멤버스 포인트'+ this.headerPoint +'점 <br> 사용처리가 완료되었습니다.'

            }else{
                this.alertTitle = ''
                this.alertContent = '1일 사용가능 포인트를 모두 <br/>소진하였습니다.<br/>' +
                    '다음에 이용해 주세요.'
            }
        },
        tap_buyOptionConfirm: function() {
            this.alertOption = false
        }
    }

});