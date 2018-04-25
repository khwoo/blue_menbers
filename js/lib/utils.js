
var utils = {};

utils.install = function( Vue ){
    Vue.prototype.$utils_location_params = function( that ){
        var href = location.href;
        var _paramStr = href.split('?')[1];

        if(_paramStr == null || _paramStr == "undefined"){

            _paramStr = "_";

        }
        var _paramList = _paramStr.split('&');
        for(var i = 0 ; i < _paramList.length ; i++ ){
            var _str = _paramList[i];
            var _item = _str.split('=');

            if( _item[0] ==='uid' ){

                that['key_custNo'] = _item[1];

            }else{

                that['key_' + _item[0] ] = _item[1];

            }

        }

        //uid
        //that['key_custNo'] = '00012105';
    }

    //일자 설정
    //년 월 일
    Vue.prototype.$utils_date = function( str , item_1 , item_2 , item_3 ){
        if(item_1 == null || item_1 == 'undefined'){
            item_1 = '-';
        }
        if(item_2 == null || item_2 == 'undefined'){
            item_2 = '-';
        }
        if(item_3 == null || item_3 == 'undefined'){
            item_3 = '';
        }
        var arr = [
            str.substring(0,4)
            ,item_1
            ,str.substring(4,6)
            ,item_2
            ,str.substring(6,8)
            ,item_3
        ].join('');
        return arr;

    }

    Vue.prototype.$utils_history_replaceState = function( param ){

        url = location.href.substring( 0 , location.href.indexOf('?') ) ;
        var paramStr = '';
        for( var key in param ){
            paramStr += key + "=" + param[key] + "&";
        }
        paramStr = paramStr.substring( 0 , paramStr.length - 1 );

        console.log(paramStr);

        url = url + '?' + paramStr;

        history.replaceState( null , null , url );

    }

    Vue.prototype.$utils_popupForm = function( that , show , title , content  , cancelShow ,  callbackSuccess , callbackFail ){

        if(that.popformdata == null || that.popformdata == 'undefined'){
            that.popformdata = {};
        }
            console.log(that.popformdata);
        if(show == null || show == 'undefined' ){
            that.popformdata.alertOption = false;
        }else{
            that.popformdata.alertOption = show;
        }
        that.popformdata.alertOption = true;
        that.popformdata.alertTitle = title;
        that.popformdata.alertContent = content;
        that.popformdata.alertCall_1 = callbackSuccess;
        if(that.popformdata.cancelShow) {
            that.popformdata.alertCall_2 = callbackFail;
        }
        that.popformdata.cancelShow = cancelShow;



    }

    Vue.prototype.$utils_popup = function( that , show , title , content  ){

        if(that.popdata == null || that.popdata == 'undefined'){
            that.popdata = {};
        }

        if(show == null || show == 'undefined' ){
                that.popdata.alertOption = false;
        }else{
            that.popdata.alertOption = show;
        }
        that.popdata.alertOption = true;
        that.popdata.alertTitle = title;
        that.popdata.alertContent = content;

    }

    Vue.prototype.$utils_setOtp = function( that , callbackSuccess , callFail ){

        var _data = [
            '1'
            ,CHANNEL_CODE
            ,that.key_ticketNo
        ].join(',');

        if( location.href.indexOf('point_use') != -1 ){

            _data = [
                '2'
                ,CHANNEL_CODE
                ,that.key_custNo
                ,that.key_brandCd
                ,that.myPoint
            ].join(',');

        }

        echoss.Icon.setEchossIconData({
            aprvData    : _data,
            //otpGbn,chCd,custNo,brdId,usePoint
            funcCd      : "SBLPT",
            isuDivCd    : echoss.Icon.OTP_ISSUE_TYPE.COMMON_ETC,
            cntYn       : "N"
        }, function(res) {

            console.log(res);

            echoss.Icon.hideIcon();

            return callbackSuccess();

        }, function(errorCode, errorMessage) {
            return callFail();
        });

    }

    //초기화
    Vue.prototype.$utils_echoss_init = function( that, callbackSuccess , callbackFail ){
        var API_KEY = 'd608b72f661734755a401db13973b26c0';
        echoss.initialize(API_KEY, echoss.REGION_CODE_TYPE.KOREA);
        echoss.initializeSuccess = function() {

            echoss.setLanguageCode(echoss.Common.LANGUAGE_CODE_TYPE.KOREAN);
            echoss.Stamp.init( function(locUseTyp) {
                echoss.Icon.init();
                echoss.Icon.enableStampingErrorMsg(true);

                echoss.Icon.showIcon();

                return callbackSuccess(true);

            }, function(errorCode, errorMsg) {
                return callbackFail( errorCode , errorMsg );
            });
        }
    }

    Vue.prototype.$utils_echoss_onStampRemove = function(){

        echoss.Stamp.onStamp = function(stampParams) {
            return;
        }
        echoss.Stamp.onError = function(errorCode, errorMsg) {
            return;
        };

    }

    Vue.prototype.$utils_echoss_onStamp = function( callbackSuccess , callbackFail ){
        echoss.Stamp.onStamp = function(stampParams) {

            startStampAnimation();
            return callbackSuccess(stampParams);
        }
        echoss.Stamp.onError = function(errorCode, errorMsg) {
            return callbackFail(errorCode , errorMsg);
        };
    }

    Vue.component('popupform' , {
        template : '<transition name="fade">' +
        '            <div v-if="popformdata.alertOption" class="modal alert">' +
        '                <div class="bg_shadow flex_column_center">' +
        '                    <div class="modal_box flex_column_center">' +
        '                        <p class="title" v-text="popformdata.alertTitle"></p>' +
        '                        <p style="text-align:center;" class="alert_content" v-text="popformdata.alertContent"></p>' +
        '                        <div class="btn_group flex_between">' +
        '                            <a v-if="!popformdata.cancelShow" class="btn_one flex_center" href="javascript:void(0)" @click="fail" style="margin: 0 5px 0 0;">' +
        '                                <p>취소</p>' +
        '                            </a>' +
        '                            <a class="btn_one flex_center" href="javascript:void(0)" @click="success">' +
        '                                <p>확인</p>' +
        '                            </a>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </transition>'
        ,props: ['popformdata']
        ,methods : {
            success : function(){
                var that = this;
                that.popformdata.alertOption = false;
                return that.popformdata.alertCall_1();
            },

            fail:function(){
                var that = this;
                that.popformdata.alertOption = false;
                return that.popformdata.alertCall_2();
            }
        }
    });


    Vue.component('popup' , {
        template : '<transition name="fade">' +
        '            <div v-if="popdata.alertOption" class="modal alert">' +
        '                <div class="bg_shadow flex_column_center">' +
        '                    <div class="modal_box flex_column_center">' +
        '                        <p class="title" v-text="popdata.alertTitle"></p>' +
        '                        <p style="text-align:center;" class="alert_content" v-text="popdata.alertContent"></p>' +
        '                        <div class="btn_group flex_between">' +
        '                            <a class="btn_one flex_center" href="javascript:void(0)" @click="popdata.alertOption=!popdata.alertOption">' +
        '                                <p>확인</p>' +
        '                            </a>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </transition>'
        ,props: ['popdata']
    });

    var VueBarcode = window.VueBarcode;
    Vue.component('barcode', VueBarcode);
    //로드 component
    Vue.component('loading', {
        template: '<div v-show="loading_type" class="loading_parent"><div class="loading_sub"></div></div>'
        ,props :['loading_type']
    })
}
//사용
Vue.use( utils );
