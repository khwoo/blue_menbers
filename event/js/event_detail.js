Vue.use(scroll);
var vm = new Vue({
	el: ".container",
	data: {
		brandName: '이달의 혜택',
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


		that.wallet_url = [
			'wallet.html'
			, '?'
			, 'custNo=' + that.key_custNo
			, '&'
			, 'uid=' + that.key_uid
		].join('');

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

			brdGoodsList = [{
				goodsCd:'G19010201623'
				,brdNm:'아웃백'
				,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194553815.png'
				,goodsNm:'[V2]갈릭립아이 A세트'
				,goodsSalPrice:'52720'
				,goodsCnt:'0'
				,goodsSalGbn:'1'
				,goodsQttGbn:'1'
				,goodsQttEpsYn:'N'
				}
				,{
				goodsCd:'G19010201622'
				,brdNm:'아웃백'
				,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194610116.png'
				,goodsNm:'[V2]갈릭립아이 B세트'
				,goodsSalPrice:'76470'
				,goodsCnt:'0'
				,goodsSalGbn:'1'
				,goodsQttGbn:'1'
				,goodsQttEpsYn:'N'
				}
				,{
				goodsCd:'G19010201621'
				,brdNm:'계절밥상'
				,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194633385.png'
				,goodsNm:'계절밥상 평일 저녁/주말 1인'
				,goodsSalPrice:'22700'
				,goodsCnt:'0'
				,goodsSalGbn:'1'
				,goodsQttGbn:'1'
				,goodsQttEpsYn:'N'
				}
				,{
				goodsCd:'G19010201620'
				,brdNm:'계절밥상'
				,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194648647.png'
				,goodsNm:'계절밥상 평일점심 1인'
				,goodsSalPrice:'14150'
				,goodsCnt:'0'
				,goodsSalGbn:'1'
				,goodsQttGbn:'1'
				,goodsQttEpsYn:'N'
				}
				,{
				goodsCd:'G19010201619'
				,brdNm:'알펜시아리조트'
				,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194707115.png'
				,goodsNm:'알펜시아 리조트 리프트권(대소공용)'
				,goodsSalPrice:'32000'
				,goodsCnt:'0'
				,goodsSalGbn:'1'
				,goodsQttGbn:'1'
				,goodsQttEpsYn:'N'
				}
				,{
					goodsCd:'G19010201618'
					,brdNm:'제주 아쿠아플라넷'
					,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194730586.png'
					,goodsNm:'제주 아쿠아플라넷 종합권(대인)'
					,goodsSalPrice:'30590'
					,goodsCnt:'0'
					,goodsSalGbn:'1'
					,goodsQttGbn:'1'
					,goodsQttEpsYn:'N'
				}
				,{
					goodsCd:'G19010201617'
					,brdNm:'부천 플레이 아쿠아리움'
					,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194745821.png'
					,goodsNm:'부천 플레이 아쿠아리움(대인)'
					,goodsSalPrice:'20140'
					,goodsCnt:'0'
					,goodsSalGbn:'1'
					,goodsQttGbn:'1'
					,goodsQttEpsYn:'N'
				}
				// ,{
				// 	goodsCd:'G19010201616'
				// 	,brdNm:'부산 아쿠아리움'
				// 	,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194804529.png'
				// 	,goodsNm:'부산 아쿠아리움 입장권 단품 (대인)'
				// 	,goodsSalPrice:'21090'
				// 	,goodsCnt:'0'
				// 	,goodsSalGbn:'1'
				// 	,goodsQttGbn:'1'
				// 	,goodsQttEpsYn:'N'
				// }
				// ,{
				// 	goodsCd:'G19010201615'
				// 	,brdNm:'부산 아쿠아리움'
				// 	,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102200013692.png'
				// 	,goodsNm:'부산 아쿠아리움 입장권 단품(소인)'
				// 	,goodsSalPrice:'17000'
				// 	,goodsCnt:'0'
				// 	,goodsSalGbn:'1'
				// 	,goodsQttGbn:'1'
				// 	,goodsQttEpsYn:'N'
				// }
				,{
					goodsCd:'G19010201614'
					,brdNm:'일산 원마운트_스노우파크'
					,goodsImg:'https://12cm-kr-esp-prod-image.s3.ap-northeast-2.amazonaws.com/commerce/prob/goods/20190102194822787.png'
					,goodsNm:'스노우파크 종일권(대인)'
					,goodsSalPrice:'14820'
					,goodsCnt:'0'
					,goodsSalGbn:'1'
					,goodsQttGbn:'1'
					,goodsQttEpsYn:'N'
				}

			];


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

