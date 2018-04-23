var vm = new Vue({
    el: '.container',
    data: {
        navTitle: '포인트 사용하기',
        myPoint: 0,
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
        wallet_url : '',
        // buySuccess: null,
        buySuccess: true // 임시로 포인트 사용 성공
        ,popdata : {

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
        formatMoney:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    mounted: function() {

        var that = this;

        that.$utils_location_params(that);

        that.wallet_url = [
            'wallet.html'
            ,'?'
            ,'custNo=' + that.key_custNo
        ].join('');

        that.cust_point_info( function(){



        },function(code , msg ){

            //error
            that.$utils_popup(that, true , '' , msg );

        });



        that.$utils_echoss_init( that ,function( res ){

            that.$utils_echoss_onStamp( function( res ){
                //쿠폰 사용
                that.coupon_use(res);
            },function(code , msg ){
                that.$utils_echoss_onStamp( code , msg );
            });

        },function( code , msg  ){

            that.$utils_popup( that, true , '' , msg );

        });

        this.$nextTick(function() {



        })
    },
    methods: {

        /*
        *
        * 유저 포인트 정보 조회
        *
        * */
        cust_point_info : function( callbackSuccess , callbackFail ){
            var that = this;
            var param = {};

            param.custNo = that.key_custNo;

            that.loading_type = true;

            BM.CUST_POINT_SEARCH(param , function( res ){

                that.loading_type = false;
                that.myPoint = res.custPoint;

                return callbackSuccess(true);

            },function( code , msg ){
                that.loading_type = false;
                return callbackFail(code , msg );

            });

        }

        ,tap_pointUse: function(index) {
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