
var vm = new Vue({
    el: '.container',
    data: {
        onReady:false,
        wallet_url : 'javascript:void(0)' ,
        bizlist : [
                {
                    "categoryCd": "CTG0001CT0001",
                    "groupId" : "CTG0001",
                    "categoryNm": "골프",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_4.png",
                    "url" : "main.html?custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0001"
                },
                {
                    "categoryCd": "CTG0001CT0002",
                    "groupId" : "CTG0001",
                    "categoryNm": "생화 편의",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_3.png",
                    "url" : "main.html?custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0002"
                },
                {
                    "categoryCd": "CTG0001CT0003",
                    "groupId" : "CTG0001",
                    "categoryNm": "여행",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_2.png",
                    "url" : "main.html?custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0003"
                },
                {
                    "categoryCd": "CTG0002CT0001",
                    "groupId" : "CTG0002",
                    "categoryNm": "도서테마",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_1.png",
                    "url" : "main.html?custNo=00012105&menuIdx=CTG0002&categoryIdx=CTG0002CT0001"
                }
        ]
        ,brandUrllist : []
        ,coupon_box :''
        ,main_url :''
    },

    created:function(){
        this.brand_url();
    }
    ,mounted: function() {

        var that = this;
        that.$utils_location_params(that);

        that.brand_url();

        that.coupon_box = [
            'coupon_box.html'
            ,'?'
            ,'custNo=' + that.key_custNo
        ].join('');

        //main.html
        that.main_url = [
            'main.html'
            ,'?'
            ,'custNo=' + that.key_custNo
        ].join('');


        that.echoss_link();

        this.$nextTick(function() {
            this.onReady = !this.onReady;
        })
    },
    methods: {

        echoss_link : function(){

            var that = this;

            if(that.key_uid == undefined){

                return;

            }

            that.$utils_echossHttpSend(PF_URL + "/fcm/gateway/link", {

                uid     : that.key_uid,
                sid     : that.key_uid,
                sto     : 0

            }, "POST", function(result) {

                that.key_custNo = result.user;
                var scheme = result.scheme;

                that.userInfo();

                var historyParam = {};

                historyParam.custNo = that.key_custNo;

                that.$utils_history_replaceState( historyParam );

                that.wallet_url = scheme + "://echoss/close";

            }, function(errorCode, errorMessage, result) {
                if(result != undefined) {
                   var scheme = result.scheme;

                    that.wallet_url = scheme + "://echoss/close";
                }
            });

        }
        ,userInfo : function(){

            var that = this;

            var param = {};
            param.custNo = that.key_custNo;
            try {
                BM.REGIST(param, function (res) {

                }, function (code, msg) {

                });
            }catch( e ){

                //error

            }

        }

        ,brand_url : function(){

            var that = this;

            var _url = new Array();

            _url.push({
                link_url : [
                    'wallet_submain_img.html'
                    ,'?'
                    ,'custNo=' + that.key_custNo
                    ,'&'
                    ,'brandCd=V00A044B001'
                ].join('')
            });

            _url.push({
                link_url : ['javascript:void(0);'].join('')
            });

            _url.push({
                link_url : [
                    'wallet_submain_text.html'
                    ,'?'
                    ,'custNo=' + that.key_custNo
                    ,'&'
                    ,'brandCd=V00A044B001'
                ].join('')
            });

            _url.push({
                link_url : ['javascript:void(0);'].join('')
            });

            that.brandUrllist = _url;

        }
        ,company_url:function(){

            var that = this;

            var _url = [
                'company_info.html'
                ,'?'
                ,'custNo=' + that.key_custNo
            ].join('');

            location.href = _url;

        }

    }

});









//

