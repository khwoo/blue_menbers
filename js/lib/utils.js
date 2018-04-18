
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
            that['key_' + _item[0] ] = _item[1];
        }
        that['key_custNo'] = '00012105';
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

    //로드 component
    Vue.component('loading', {
        template: '<div v-show="loading_type" class="loading_parent"><div class="loading_sub"></div></div>'
        ,props :['loading_type']
    })
}
//사용
Vue.use( utils );
