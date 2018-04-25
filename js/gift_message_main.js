var vm = new Vue({
    el: '.container',
    data: {
        stampType: true,
        brandName: '',
        presenter: '',
        imgUrl: '',
        brandId : '' ,
        giftName: '',
        giftNum: '',
        giftValidity: '',
        usedDate : '' ,
        usedPlace : '' ,
        expiryDate : '' ,
        barCodeSrc: '',
        ticketUseCd : '',
        couponDisable : false ,
        couponUsed : false ,
        stampUse : true ,
        pinNo : '',
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

        that.loading_type = true;

        that.ticket_info(function( res ){
            console.log(res);
            //사용 방식
            if( that.ticketUseCd == '1' || that.ticketUseCd == '9' ){

                if( res.stCd == '1' ){

                    that.$utils_echoss_init( that ,function( res ){

                        that.loading_type = false;

                        that.$utils_echoss_onStamp( function( res ){

                            //쿠폰 사용
                            that.ticket_use( res );

                        },function(code , msg ){

                            that.$utils_popup(that, true, '' , msg );

                        });

                        //otp
                        that.$utils_setOtp( that,  function(){

                            that.ticket_info( function(){ });

                        },function( code , msg ){
                            //otp error
                            that.$utils_popup(that,true,'', msg );

                        });

                    },function( code , msg  ){
                        that.$utils_popup( that, true , '' , msg );
                    });

                }else{

                    that.loading_type = false;

                }

            }else{

                that.loading_type = false;

            }

        });

    },
    methods: {

        ticket_use : function( res ){

            var that = this;

            var param = {};

            param.custNo			= that.key_custNo;
            param.ticketNo			= that.key_ticketNo;
            param.eq				= res.equipTyp;
            param.s				    = res.s;
            param.p				    = res.p;
            param.c				    = res.c;
            param.version			= res.version;
            param.brand            = that.brandId;

            BM.TICKET_USE( param , function(){

                that.ticket_info( function(){

                    stopStampAnimation();

                });


            },function( code , msg ){

                stopStampAnimation();

                that.$utils_popup(that, true , '' , msg );

            });

        },

        ticket_info : function( callback ){

            var that = this;

            var param = {};

            param.ticketNo = that.key_ticketNo;

            //stamp barcode 유형

            BM.TICKET_INFO( param , function( res ){

                that.brandId = res.brdId;
                that.brandName = res.brdNm;
                that.presenter = res.custNm;
                that.imgUrl = res.ticketDtlImgUrl;
                that.giftName = res.ticketGoodsNm;
                that.giftNum = "쿠폰번호 : " + res.pinNo;
                that.pinNo = res.pinNo;

                if( res.expiDt.length == 2 ) {
                    if( res.expiDt.indexOf("일") >= 0 )
                        that.giftValidity = "구매일로부터 " + res.expiDt.substr(0,1) + "일";
                    else if( res.expiDt.indexOf("월") >= 0 )
                        that.giftValidity = "구매일로부터 " + res.expiDt.substr(0,1) + "개월";
                }
                else if( res.expiDt.length == 3 ) {
                    if( res.expiDt.indexOf("일") >= 0 )
                        that.giftValidity = "구매일로부터 " + res.expiDt.substr(0,2) + "일";
                    else if( res.expiDt.indexOf("월") >= 0 )
                        that.giftValidity = "구매일로부터 " + res.expiDt.substr(0,2) + "개월";
                }
                else if( res.expiDt.length == 8 ) {
                    that.giftValidity = "~ " + res.expiDt.substr(0,4) + "-" + res.expiDt.substr(4,2) + "-" + res.expiDt.substr(6,2);
                }
                else {
                    that.giftValidity = "유효기간 없음";
                }

                //쿠폰 상테
                that.couponDisable   = false;
                that.couponUsed          = false;

                if( res.stCd === '2' || res.stCd === '8' ){
                    if( res.stCd === '2' ){

                        that.couponUsed  = true;

                        that.usedDate = [
                            res.useDt.substr(0,4)
                            ,'-'
                            ,res.useDt.substr( 4 , 2 )
                            ,'-'
                            ,res.useDt.substr( 6 , 2 )
                            ,' '
                            ,res.useTm.substr( 0 , 2 )
                            ,':'
                            ,res.useTm.substr( 2 , 2 )
                        ].join('');

                        that.usedPlace = res.brdNm;
                    }
                    if( res.stCd === '8' ){

                        that.couponUsed  = false;
                        that.expiryDate = that.giftValidity;

                    }
                    that.couponDisable = true;
                }

                that.giftValidity = "유효기간 : " + that.giftValidity;

                //스탬프 , 박코드
                //ticketUseCd
                var _useCd = res.ticketUseCd.split(',');

                var _val = 0;
                for(var i = 0 ; i< _useCd.length;i++){
                    if(_useCd[i] == '1' || _useCd[i] =='2' ){
                        _val += 1;
                        that.ticketUseCd = _useCd[i];
                    }
                }
                if(_val >= 2){
                    that.ticketUseCd = '9';
                }


                return callback( res );

            },function( code , msg ){
                that.loading_type = false;
                that.$utils_popup( that , true , '' , msg );

            });

        }

    }

});