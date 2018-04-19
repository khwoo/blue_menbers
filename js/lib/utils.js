
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

    //로드 component
    Vue.component('loading', {
        template: '<div v-show="loading_type" class="loading_parent"><div class="loading_sub"></div></div>'
        ,props :['loading_type']
    })
}
//사용
Vue.use( utils );
