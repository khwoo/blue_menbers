
Vue.use(scroll);

var vm = new Vue ({
    el:".container",
    data: {
        menuIdx: 0 ,
        pageNo : 1,	//페이지
        loadValue : 100, //로드 위치
        loadStatus :true,  //로드 상태
        menuList: [], //menu data
        menuShow: false,
        perLineFive: false, // category_box 에 한줄에 매뉴 노출 수량 4개 or 5개
        categoryIdx: 0 ,
        categoryList: [], // 카테고리

        mainSwiper: [], //배너

        productList: [], //상품
        productCountType : 1 //
        ,loading_show : true
        ,coupon_box : ''
        ,wallet_url : ''
        ,loading_type : false
        ,popdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''

        }

    },
    filters:{
        formatPoint:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    mounted: function() {
        var that = this;

        that.$utils_location_params( that );

        that.$ScrollStart( that , function(){
            that.productData( false );
        });

        that.coupon_box = [
            'coupon_box.html'
            ,'?'
            ,'custNo=' + that.key_custNo
            ,'&'
            ,'uid=' + that.key_uid
        ].join('');

        that.wallet_url =[
            'wallet.html'
            ,'?custNo=' + that.key_custNo
            ,'&'
            ,'uid=' + that.key_uid
        ].join('');

        var param = {};
        param.custNo = that.key_custNo;
        console.log(that.key_menuIdx);
        console.log(that.key_categoryIdx);

        if( that.key_menuIdx != null && that.key_menuIdx != "undefined" ){

            param.ctgrGrpCd = that.key_menuIdx;
            that.menuIdx = that.key_menuIdx;

        }

        if( that.key_categoryIdx != null && that.key_categoryIdx != "undefined" ){

            param.ctgrCd = that.key_categoryIdx;
            that.categoryIdx = that.key_categoryIdx;

        }

        that.loading_type = true;

        BM.MAIN( param ,function( res ){
            console.log(res);
            that.mainData( res );

            if(res.bnrList.length > 0){
                that.banrData( res );
            }

            that.productData(  true , res );

            that.loading_type = false;

        },function( code , msg ){
            that.loading_type = false;
            that.$utils_popup( that , true , '' , msg );

        });

    },
    computed: {
        filterCategory:function(){
            return this.categoryList.parts.slice(1);
        }
    },
    methods: {
        cityIndex: function() {
            var cityId = event.target.value;
            if(cityId !=0) {
                this.selectAllCity = false
            }
        }
        //상품 정보
        ,productData : function( scroll , data ){

            var that = this;

            if(!scroll){

                if(that.productCountType <= 0){

                    return;

                }
                that.loadStatus = false;
                that.loading_show = false;
                var param = {};
                param.lastSelNo = that.productList.length;
                param.custNo = that.key_custNo;
                if( that.menuIdx !== 0 && that.menuIdx != '0' ){
                    if(that.categoryIdx !== 0){
                        param.ctgrGrpCd = that.menuIdx;
                        param.ctgrCd = that.categoryIdx;
                        if(param.ctgrCd === ''){

                            param.ctgrCd = '';

                        }
                    }else{
                        param.ctgrGrpCd = '';
                        param.ctgrCd = '';
                    }
                }else{
                    param.ctgrGrpCd = '';
                }
                console.log(param);
                BM.SAL_GOODS_LIST( param ,function(res){

                    that.loadStatus = true;
                    that.loading_show = true;
                    if( res.salGoodsList.length > 0 ){
                        that.productData_handle( scroll ,  res);
                    }else{
                        that.productCountType = 0;
                    }


                },function( code , msg ){
                    that.loadStatus = true;
                    that.loading_show = true;
                });

            }else{
                that.productCountType = 1; //
                that.productData_handle( scroll , data );

            }
        }
        ,productData_handle : function( scroll , data ){

            var that = this;

            var productList = new Array();
            for(var i = 0 ; i < data.salGoodsList.length ; i++ ){
                var _item = data.salGoodsList[i];

                //goodsSalGbn 1 포인트 쿠폰
                //goodsSalGbn 2 할인 쿠폰

                if(_item.goodsSalGbn == '1' ){

                    _item.url = 'details.html'+
                        '?custNo='+ that.key_custNo +''+
                        '&uid=' + that.key_uid + '' +
                        '&productId='+ _item.goodsCd +' ';

                }

                if(_item.goodsSalGbn == '2' ){

                    _item.url = 'discount_details.html'+
                        '?custNo='+ that.key_custNo +''+
                        '&uid=' + that.key_uid + '' +
                        '&productId='+ _item.goodsCd +' ';

                }

                if(_item.goodsQttEpsYn == 'Y' ){

                    _item.url = 'details_1.html'+
                        '?custNo='+ that.key_custNo +''+
                        '&uid=' + that.key_uid + '' +
                        '&productId='+ _item.goodsCd +' ';

                }


                productList.push( _item );
            }

            if( scroll ){

                that.productList = productList;

            }else{

                for(var i = 0 ; i < productList.length ; i++ ){

                    that.productList.push( productList[i] );

                }

            }

        }
        //배너 정보
        ,banrData : function( data ){
            var that = this;

            /*
                배너 연결 구분 :
                0-연결없음
                1-상품연결
                2-외부연결
                3-내부연견
             */

            var arr = new Array();

            for(var i = 0 ; i < data.bnrList.length ;i++ ){

                var _item = data.bnrList[i];

                var _href = 'javascript:void(0);';

                var _target = '_blank';

                switch(_item.bnrLinkGbn){

                    case "1":

                        //상품연결
                        //


                        if(_item.goodsSalGbn == '1' ){

                            _href = 'details.html'+
                                '?custNo='+ that.key_custNo +''+
                                '&uid=' + that.key_uid + '' +
                                '&productId='+ _item.goodsCd +' ';

                        }

                        if(_item.goodsSalGbn == '2' ){

                            _href = 'discount_details.html'+
                                '?custNo='+ that.key_custNo +''+
                                '&uid=' + that.key_uid + '' +
                                '&productId='+ _item.goodsCd +' ';

                        }

                        break;
                    case "2":

                        //외부연결
                        _href = _item.linkUrl;

                        _target = '_blank';

                        break;
                    case "3":

                        //내부연결
                        _href = [
                            _item.linkUrl
                            ,'?'
                            ,'custNo=' + that.key_custNo
                            ,'&'
                            ,'uid=' + that.key_uid
                            ,'&'
                            ,'bannerNm=' + _item.bnrNm
                            ,'&'
                            ,'linkUrl=' + encodeURIComponent(_item.linkUrl)
                        ].join('');

                        break;

                }

                _item.href = _href;

                _item.target = _target;


                arr.push( _item );
            }

            that.mainSwiper     = arr;

            setTimeout(function(){
                new Swiper ('.main_swiper',{
                    autoplay: {
                        delay: 4000
                        ,disableOnInteraction : false
                    },
                    loop: true,
                    pagination: {
                        el: '.main_pagination'
                    }
                });
            },1);

        }
        //메인 정보
        ,mainData : function( data ){
            var that = this;
            var menuList        = new Array();
            var categoryList    = new Array();
            menuList.push({
                    id : 0
                    ,name : '홈'
            });
            //메뉴 정보
            for(var i = 0 ; i < data.ctgrGrpList.length ; i++ ){
                var _item   = data.ctgrGrpList[i];

                //메뉴
                var _menu_param  = {};
                _menu_param.id   = _item.ctgrGrpCd;
                _menu_param.name = _item.ctgrGrpNm;
                menuList.push(_menu_param);

                //카테고리
                var _category_param = {};
                _category_param.categoryType = _item.ctgrGrpCd;
                _category_param.categoryNm = _item.ctgrGrpNm;
                _item.ctgrList.unshift({
                    ctgrCd : ''
                    ,ctgrImg : 'images/icon_all_category.png'
                    ,ctgrNm :'전체'
                });
                _category_param.parts = _item.ctgrList;
                categoryList.push( _category_param );

            }
            that.menuList       = menuList;
            that.categoryList   = categoryList;
        }
        //그룹
        ,selectgroup : function( e ){
            var that = this;
            var parent = e.target;
            var p = true;
            while( p ){
                if( parent.getAttribute('data-id') != null && parent.getAttribute('data-id') != '' ){
                    p = false;
                }else{
                    parent = parent.parentNode;
                }
            }
            var id = parent.dataset.id;
            that.menuIdx = id;
            that.categoryIdx = 0;

            var id = parent.dataset.id;
            that.categoryIdx = id;

            var historyParam = {};

            if( that.menuIdx == '0' ){

                historyParam.custNo = that.key_custNo;
                historyParam.uid = that.key_uid;

            }else{

                historyParam.custNo = that.key_custNo;
                historyParam.menuIdx = that.menuIdx;
                historyParam.categoryIdx = '';
                historyParam.uid = that.key_uid;

            }

            that.$utils_history_replaceState( historyParam );



            var param = new Array();
            if( that.menuIdx == 0 ){


                param.custNo = that.key_custNo;

            }else{
                param.ctgrGrpCd = that.menuIdx;
                param.custNo = that.key_custNo;
                param.ctgrCd = '';
                that.key_categoryIdx = '';
                that.categoryIdx = '';
            }

            that.loading_type = true;

            BM.MAIN( param ,function( res ){
                if( res.bnrList.length > 0 ){
                    that.banrData( res );
                }
                that.productData(  true , res );

                that.loading_type = false;

            },function( code , msg ){

                that.loading_type = false;
                that.$utils_popup( that , true , '' , msg );

            });


        }
        //카테고리
        ,selectCategory : function( e ){
            var that = this;
            var parent = e.target;
            var p = true;
            while( p ){
                console.log(parent.getAttribute('data-id'));
                if( parent.getAttribute('data-id') != null){
                    p = false;
                }else{
                    parent = parent.parentNode;
                }
            }
            var id = parent.dataset.id;
            that.categoryIdx = id;

            var param = new Array();

            if(that.menuShow){
                that.menuShow = false;
                that.menuIdx = parent.getAttribute('data-group_id');
            }

            param.custNo = that.key_custNo;
            param.ctgrGrpCd = that.menuIdx;
            if( that.categoryIdx === '' ){

                param.ctgrCd = '';

            }else{

                param.ctgrCd = that.categoryIdx;

            }
            console.log(param);


            //$utils_history_replaceState

            var historyParam = {};

            historyParam.custNo = that.key_custNo;
            historyParam.menuIdx = that.menuIdx;
            historyParam.categoryIdx = that.categoryIdx;
            historyParam.uid = that.key_uid;

            that.$utils_history_replaceState( historyParam );

            that.key_categoryIdx = that.categoryIdx;

            that.$utils_pageView( that );

            that.loading_type = true;

            BM.MAIN( param ,function( res ){
                if( res.bnrList.length > 0 ){

                    that.banrData( res );

                }
                //menuShow
                console.log(that.menuShow);
                that.productData(  true , res );

                that.loading_type = false;

            },function( code , msg ){
                that.loading_type = false;
                that.$utils_popup( that , true , '' , msg );
            });

        }
    }
});


var recommendSwiper = new Swiper('.recommend_swiper',{
    // autoplay: {
    //     delay: 5000,
    // },
    loop: true,
    slidesPerView : 2,
    slidesPerGroup : 2,
    // spaceBetween : '10%',
    pagination: {
        el: '.recommend_pagination'
    }
});
