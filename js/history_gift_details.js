var vm = new Vue ({
    el:".container",
    data: {
        navTitle: '이용내역',
        productImg: 'images/product_item_02.jpg',

        productName: '스타벅스코리아 아이스아메리카노 1+1 SET 2줄 일수도 있지',
        usedStatus: 5,
        giftTo: '010-7744-1251',
        giftFrom: '홍길동',
        giftMessage: '유진아 생일을 정말 축하해~<br/>' +
        '행복한 생일 보내길 바래!!행복한 생일 보내길 바래!!',

        customerNumber: '023397984216',
        usedDate: '2018-04-09 15:00',
        usedPoint: 1000,

        canceled: null, // 취소는 true, 아니면 false
        cancelDate: '2018. 04. 09 12:00',

        boughtQuantity: 10,
        alertShow: false,
        alertOption: false,
        alertTitle: '',
        alertContent: '',
        giftUsed: true
    },
    filters:{
        formatPoint:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },

    mounted: function() {
        this.$nextTick(function() {

            if(this.usedStatus == 5) {
                this.usedStatus = '선물'
                this.canceled = false
            }else if (this.usedStatus == 6) {
                this.usedStatus = '선물취소'
                this.canceled = true
            }

        })
    },

    methods: {
        tap_giftCancel: function() {
            this.alertShow = true
        },
        tap_giftAgain: function() {
            this.alertOption = true
            this.alertTitle = '재전송'
            this.alertContent = '재전송 되었습니다.'
        },
        tap_cancel: function() {
            this.alertShow = false
        },
        tap_cancelConfirm: function() {
            this.alertShow = false
            this.alertOption = true
            if(this.giftUsed == true) {
                this.alertTitle = '선물취소'
                this.alertContent = '쿠폰을 사용하여 취소할 수 없습니다.'
            }else {
                this.alertTitle = '선물취소 완료'
                this.alertContent = '선물 취소가 완료되었습니다.'
            }
        },
        tap_buyOptionConfirm: function() {
            this.alertOption = false
        }

    }
});

