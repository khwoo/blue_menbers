var vm = new Vue ({
    el:".container",
    data: {
        navTitle: '쿠폰상세',
        couponDisable: false,
        couponUsed: true,
        usedDate: '2018-04-09 15:00',
        usedPlace: '플라자CC용인',
        expiryDate: '2018-04-09',
        trxNo : '',
        productImg: '',
        brandName: 'Brand name',
        productName: 'Product name\n' +
        '상품명이 2줄일수 있겠죠?',
        useDate: '2018.12.31',
        couponNumber: 'code',
        brdId : '',
        noticeList: [],
        stampMethod : false ,
        coupon_details_move : 'javascript:void(0);',
        loading_type : false,
        ticketUseCd : "1" ,
        coupon_box_url : ''
        ,popdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''

        }

    },

    mounted: function() {
        var that =this;
        that.$utils_location_params(that);

        that.coupon_box_url = [
            'coupon_box.html'
            ,'?'
            ,'custNo=' + that.key_custNo
        ].join('');

        //

        that.couponInfo(function( res){


            //사용 방식
            if( that.ticketUseCd == '1' || that.ticketUseCd == '9' ){

                console.log(res.stCd);

                if( res.stCd == '1' ){

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

                }



            }


        },function( code, msg ){

        });




    },

    methods: {

        coupon_use : function( data ){

            var that = this;

            var param = {};

            param.custNo = that.key_custNo;
            param.ticketNo = that.key_ticketNo;
            param.eq = data.equipTyp;
            param.s = data.s;
            param.p = data.p;
            param.c = data.c;
            param.version = data.version;
            param.brand = that.brdId;

            BM.TICKET_USE( param , function( res ){

                stopStampAnimation();

                that.couponDisable = true;
                that.couponUsed = true;

            },function( code , msg ){

                stopStampAnimation();

                that.$utils_popup(that,true,'' , msg);

            });

        }
        ,couponInfo: function( callbackSuccess , callbackFail ){

            var that = this;

            var param = {};

            param.ticketNo = that.key_ticketNo;
            BM.TICKET_INFO( param , function( res ){

                console.log(res);
                that.productImg = res.ticketDtlImgUrl;
                that.brandName = res.brdNm;
                that.productName = res.ticketGoodsNm;
                that.brdId = res.brdId;
                that.trxNo = res.trxNo;

                if( res.expiDt.length == 2 ) {
                    if( res.expiDt.indexOf("일") >= 0 )
                        that.useDate = "구매일로부터 " + res.expiDt.substr(0,1) + "일";
                    else if( res.expiDt.indexOf("월") >= 0 )
                        that.useDate = "구매일로부터 " + res.expiDt.substr(0,1) + "개월";
                }
                else if( res.expiDt.length == 3 ) {
                    if( res.expiDt.indexOf("일") >= 0 )
                        that.useDate = "구매일로부터 " + res.expiDt.substr(0,2) + "일";
                    else if( res.expiDt.indexOf("월") >= 0 )
                        that.useDate = "구매일로부터 " + res.expiDt.substr(0,2) + "개월";
                }
                else if( res.expiDt.length == 8 ) {
                    that.useDate = "~ " + res.expiDt.substr(0,4) + "-" + res.expiDt.substr(4,2) + "-" + res.expiDt.substr(6,2);
                }
                else {
                    that.useDate = "유효기간 없음";
                }

                that.couponNumber = res.pinNo;

                that.noticeList.push({
                    noticeTitle : '상품안내'
                    ,productNotice : res.goodsDesc
                });

                that.noticeList.push({
                    noticeTitle : '사용안내'
                    ,productNotice : res.useDesc
                });

                that.noticeList.push({
                    noticeTitle : '가맹점 점주'
                    ,productNotice : "주소 :" + res.brdAddr
                });

                //쿠폰 상테
                that.couponDisable   = false;
                that.couponUsed          = false;

                console.log(res.stCd);

                if( res.stCd === '2' || res.stCd === '8' ){
                    if( res.stCd === '2' ){
                        that.couponUsed  = true;
                    }
                    if( res.stCd === '8' ){
                        that.couponUsed  = false;
                    }
                    that.couponDisable = true;
                }

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

                // {
                //     noticeTitle: '상품안내',
                //         productNotice: '결이 살아있는 패스트리를 프레즐 모양으로 만든 후, 파마산 가루를 뿌려 만든 패스트리로 짭쪼름한 맛이 특징입니다.'
                // },
                // {
                //     noticeTitle: '사용안내',
                //         productNotice: '매장에서 줄을 서지 않고 주문하는 쉽고 간편한 O2O (Online to Offline) 서비스로서 앱을 통해 스타벅스 음료, 푸드 및 원두의 결제 및 주문을 완료하면 매장에서 즉시 메뉴를 받을 수 있는 스타벅스 만의 신개념 서비스 입니다.'
                // },
                // {
                //     noticeTitle: '가맹점 점주',
                //         productNotice: '주소 : 서울특별시 중구 소공로 112 (소공동)(04533) <br/>' +
                // '연락처 : +82-2-3015-1100'
                // },

            return callbackSuccess(res);

            },function( code , msg ){
                that.$utils_popup(that,true, '' , msg );
                return callbackFail(code , msg );
            });

        }

    }
});

