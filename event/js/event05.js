

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

		, termsShow: false, // popup 사용 여부
		termsYn: 'N',
		loading_type: false
		,linkCoordsList:[]
		,eventImageURL :''
		, popdata: {

			alertOption: false
			, alertTitle: ''
			, alertContent: ''
			, alertStyle: ''

		}
		, popformdata: {

			alertOption: false
			, alertTitle: ''
			, alertContent: ''
			, alertStyle: ''
			, alertCall_1: null
			, alertCall_2: null
			, cancelShow: true

		}
	},

	created:function(){

		var that = this;
		that.$utils_link( that );
		that.eventImageURL = `image/event06-1.jpg?v=${Date.parse(new Date())}`;

	},
	mounted: function() {
		var that = this;
		that.$utils_location_params( that );
		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.scrollHeight;
		let rem_px = adapt( pageWidth , pageWidth / 10 );
		let fontSize = pageWidth / pageWidth * ( pageWidth / 10 ) / rem_px * 100;
		that.pageWidth = pageWidth;
		that.pageHeight = pageHeight;
		that.remPx = rem_px;
		that.fontSize = fontSize;

		that.linkCoordsList = [{
			coords:that.setRectPosition( 10.17, 2.9 , 4.1 , 0.7 )
		}];

	},
	methods: {

		setRectPosition:function( top , left , width , height ){
			let topPosition     = ((( top * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let leftPosition    = ((( left * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let widthPosition   = parseFloat( ((( width * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat(leftPosition);
			let heightPosition  = parseFloat( ((( height * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat( topPosition );
			return `${leftPosition},${topPosition},${widthPosition},${heightPosition}`;
		}
		,devRedirect: function () {

			var that = this;

			var params = {};

			params.custNo = that.key_custNo;
			params.uid = that.key_uid;

			BM.TEESCANNER_TKN(params, function (res) {

				location.href = res.REDIRECT_URL;

			}, function () {

			});

		}

		/**
		 *
		 *   약광동의 API 호출
		 *
		 * 2018/8/13 下午3:39
		 */
		, termsAgree: function () {

			var that = this;

			var params = {}

			params.custNo = that.key_custNo;

			BM.PRIVACY_AGREEMENT_INSERT(params, function (res) {

				if (res.resultYn == 'Y') {

					that.termsYn = 'Y';
					that.termsShow = false;
					that.$utils_popupForm(that, true, '', '정보제공 동의 성공', true, function () {
						that.devRedirect();
					});

				} else {

					that.$utils_popup(that, true, '', res.errorMessage);

				}

			}, function (code, msg) {

				that.$utils_popup(that, true, '', msg);

			});

		},

		/**
		 *
		 * 약관등의
		 *
		 * 2018/8/13 下午3:32
		 */
		bannerclick: function () {

			var that = this;

			if (that.key_custNo == null || that.key_custNo == 'undefined' || that.key_custNo == '') {
				location.href = 'hyundaimembers://checklogin##' + location.href;
				return;
			}

			that.custNo = that.key_loginUserNo;
			that.loading_type = true;

			var params = {};

			params.custNo = that.key_custNo;

			BM.PRIVACY_AGREEMENT_CHECK(params, function (res) {

				that.loading_type = false;

				if (res.resultYn == 'Y') {
					that.termsShow = false;
					that.devRedirect();
					// that.$utils_popupForm(that, true, '', '정보제공 동의 했습니다', true, function () {
					//    that.devRedirect();
					// });
				} else {
					that.termsShow = true;
					//that.$utils_popup(that, true, '', res.errorMessage);

				}

			}, function (code, msg) {
				that.loading_type = false;
				that.$utils_popup(that, true, '', msg);
			});


		}

	}

});