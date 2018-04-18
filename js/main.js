
Vue.use(scroll);

var vm = new Vue ({
    el:".container",
    data: {
        menuIdx: 0,
        pageNo : 1,	//페이지
        loadValue : 100, //로드 위치
        loadStatus :true,  //로드 상태
        menuList: [], //menu data
        menuShow: false,
        perLineFive: false, // category_box 에 한줄에 매뉴 노출 수량 4개 or 5개
        categoryIdx: 0,
        categoryList: [], // 카테고리

        mainSwiper: [], //배너

        productList: [], //상품
        productCountType : 1 //
        ,loading_show : true
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

        BM.MAIN( param ,function( res ){
            console.log(res);
            that.mainData( res );
            if(res.bnrList.length > 0){
                that.banrData( res );
            }
            that.productData(  true , res );

        },function( code , msg ){
            console.log(code , msg );
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
                        if(param.ctgrCd === '-1'){

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
                _item.url = 'details.html'+
                    '?custNo='+ that.key_custNo +''+
                    '&productId='+ _item.goodsCd +' ';
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
            that.mainSwiper     = data.bnrList;
            setTimeout(function(){
                new Swiper ('.main_swiper',{
                    autoplay: {
                        delay: 4000
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
                    ctgrCd : -1
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
            console.log(that.menuIdx);
            if( that.menuIdx == 0 ){

                var param = new Array();
                param.custNo = that.key_custNo;
                BM.MAIN( param ,function( res ){
                    if( res.bnrList.length > 0 ){
                        that.banrData( res );
                    }
                    that.productData(  true , res );

                },function( code , msg ){
                    console.log(code , msg );
                });

            }

        }
        //카테고리
        ,selectCategory : function( e ){
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
            that.categoryIdx = id;

            var param = new Array();

            if(that.menuShow){
                that.menuShow = false;
                that.menuIdx = parent.getAttribute('data-group_id');
            }

            param.custNo = that.key_custNo;
            param.ctgrGrpCd = that.menuIdx;
            if( that.categoryIdx === '-1' ){

                param.ctgrCd = '';

            }else{

                param.ctgrCd = that.categoryIdx;

            }
            console.log(param);
            BM.MAIN( param ,function( res ){
                if( res.bnrList.length > 0 ){

                    that.banrData( res );

                }
                //menuShow
                console.log(that.menuShow);
                that.productData(  true , res );

            },function( code , msg ){
                console.log(code , msg );
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
