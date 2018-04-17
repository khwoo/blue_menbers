
var utils = {};

utils.install = function( Vue ){
    Vue.prototype.$utils_location_params = function( callback ){
        var href = location.href;
        var _paramStr = href.split('?')[1];
        var _paramList = _paramStr.split('&');
        var params = new Array();
        for(var i = 0 ; i < _paramList.length ; i++ ){
            var _str = _paramList[i];
            var _item = _str.split('=');
            var _param = {};
            _param.key = _item[0];
            _param.value = _item[1];
            params.push( _param );
        }
        return callback(params);
    }
}


//사용
Vue.use( utils );
