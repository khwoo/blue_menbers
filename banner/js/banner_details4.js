

/**
*
*   자동차 극장 배너
*   CTG0001CT0010
*
* 2018/8/17 下午5:52
*/
var vm = new Vue({
    el: '.container',
    data: {
       bannerDetailSrc: 'image/event04-2.png'
        ,bannerButton : 'image/event04-3.png'
    },

    created:function(){

        var that = this;

        that.$utils_link( that );

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params( that );



    },
    methods: {

	    bannerclick:function(){
	        location.href= 'http://www.naver.com'
        }

    }

});