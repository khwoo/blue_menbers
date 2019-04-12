Vue.use(scroll);
var vm = new Vue({
	el: ".container",
	data: {
		brandName: '',
		productList: [],
		productLength: 0,
		wallet_url: '',
		loading_type: false,
		loadValue: 100, //로드 위치
		productCountType: 1, //
		loadStatus: true,  //로드 상태
		loading_show: true,
		productLoading: false //페이지 초기화 여부
	},
	filters: {
		formatPoint: function (value, unit) {
			unit = 'P';
			return parseInt(value).toLocaleString() + unit;
		}
	},
	created: function () {
		var that = this;
		that.$utils_link(that);
	},
	mounted: function () {

		var that = this;

		that.$utils_location_params(that);

		that.brandProductList();

	}
	, methods: {

		/**
		 *
		 *  브랜드 상품 정보 조회
		 *
		 * */
		brandProductList: function () {

			var that = this;

			var param = {};

			if (that.productCountType <= 0) {

				return;

			}

			param.custNo = that.key_custNo;
			param.lastSelNo = that.productLength;

			if (!that.productLoading) {

				that.loading_type = true;

			} else {

				that.loadStatus = false;
				that.loading_show = false;

			}

			var brdGoodsList = new Array();

			var brandName = '';

			brandName = "어벤져스";
			brdGoodsList = event08DataList;

			that.brandName = brandName;

			var list = new Array();

			for (var i = 0; i < brdGoodsList.length; i++) {

				var _item = brdGoodsList[i];

				var _info = {};
				// that.brandName = _item.brdNm;
				_info.brandName = _item.brdNm;
				_info.productImg = _item.goodsImg;
				_info.productName = _item.goodsNm;
				_info.priceAfter = _item.goodsSalPrice;
				_info.goodsCnt = _item.goodsCnt;
				_info.goodsSalGbn = _item.goodsSalGbn;
				_info.goodsQttGbn = _item.goodsQttGbn;

				//goodsSalGbn 1 포인트 쿠폰
				//goodsSalGbn 2 할인 쿠폰

				if (_item.goodsSalGbn == '1') {

					_info.productHref = '../details.html' +
						'?custNo=' + that.key_custNo + '' +
						'&productId=' + _item.goodsCd + '' +
						'&uid=' + that.key_uid + '' +
						'&link=brand_gift';

				}
				if (_item.goodsSalGbn == '2') {
					_info.productHref = '../discount_details.html' +
						'?custNo=' + that.key_custNo + '' +
						'&productId=' + _item.goodsCd + '' +
						'&uid=' + that.key_uid + '' +
						'&link=brand_gift';
				}
				if (_item.goodsQttEpsYn == 'N') {

					_info.productHref = '../details_1.html' +
						'?custNo=' + that.key_custNo + '' +
						'&uid=' + that.key_uid + '' +
						'&productId=' + _item.goodsCd + ' ';

				}

				console.log(_item.url);

				list.push(_info);
			}

			if (that.productLoading) {

				for (var i = 0; i < list.length; i++) {

					that.productList.push(list[i]);

				}

				that.loadStatus = true;
				that.loading_show = true;

			} else {

				that.productLoading = true;
				that.loading_type = false;
				that.productList = list;

			}


		}

	}
});

