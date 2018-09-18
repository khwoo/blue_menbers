

/**
*
*   현대 모터스튜디오 고양 할인혜택 소개
*
*/
var vm = new Vue({
    el: '.container',
    data: {
       bannerDetailSrc: 'image/event04-1.png'
    },

    created:function(){

        var that = this;

        that.$utils_link( that );

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params( that );
	    that.$utils_blueLoginCheck(that);

    },
	methods: {


		bannerclick:function(){

			var that = this;

			location.href = [''
				,'https://web.12cmservice.co.kr/tami/bluemembers/main.html?'
				,'custNo=' + that.key_custNo
				,'&menuIdx=CTG0001'
				,'&categoryIdx=CTG0001CT0005'
				,'&uid=' + that.key_uid
			].join('');

		}


	}

});