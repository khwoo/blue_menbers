

/**
 *
 *   배너 index
 *
 */
var vm = new Vue({
	el: '.container',
	data: {
		bannerDetailSrc: 'image/event03-1.png'
		,info:{}
		,poptipsdata : {
			alertOption : false
			,alertContent : ''
		}
	},

	created:function(){

		var that = this;

		that.$utils_link( that );

	},
	mounted: function() {

		var that = this;

		that.$utils_location_params( that );

		that.getInfo();

	},
	methods: {

		/**
		*
		* 배너 정보
		*
		*/
		getInfo:function(){

			var that = this;

			var params = {};
			params.bnrCd = that.key_id;

			BM.BNR_DTL_INFO(params , function( res ){

				let info = res.BnrDtlInfo;

				that.info = info;

				// bnrCd: "B00035"
				// bnrDtlBottomImg: "https://12cm-image.s3.amazonaws.com/pointMall/dev/1538102441004.jpg"
				// bnrDtlBtnImg: "https://12cm-image.s3.amazonaws.com/pointMall/dev/1538102440246.jpg"
				// bnrDtlBtnLinkUrl: ""
				// bnrDtlBtnYn: "Y"
				// bnrDtlImg: ""
				// bnrDtlTopImg: "https://12cm-image.s3.amazonaws.com/pointMall/dev/1538102440709.JPG"
				// bnrImg: "https://12cm-image.s3.amazonaws.com/pointMall/dev/1538102438437.jpg"
				// bnrLinkGbn: "4"
				// bnrNm: "배너 테스트5"
				// bnrPstGbn: "3"
				// bnrSt: "1"
				// chCd: "3b807881ea0a4e4bae3cc31f5cdc8ac7"
				// epsEndDt: "20180905"
				// epsStDt: "20180905"
				// goodsCd: ""
				// linkUrl: "Test"

				console.info(that.info);

			},function( code , msg ){

				that.$utils_popTips( that , true , msg );

			});

		}
		,bannerclick:function(){

			var that = this;

			if(that.$utils_blueLoginCheck(that)) {
				if (that.info.bnrDtlBtnLinkUrl != '') {

					var url = that.info.bnrDtlBtnLinkUrl;

					if(url.indexOf('?') == -1 ){
						url += '?custNo=' + that.key_custNo
					}else{
						url += '&custNo=' + that.key_custNo
					}

					location.href = url;
				}
			}

		}

	}

});