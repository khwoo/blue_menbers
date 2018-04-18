
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
}
//사용
Vue.use( utils );
