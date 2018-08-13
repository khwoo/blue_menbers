
var vm = new Vue({
    el: '.container',
    data: {
        termsShow:false , // popup 사용 여부
        loading_type : false,
        termsGet:'',
        url : 'https://m.bluemembers.hyundai.com:444/hmb/membership/privacy_agreement_process.jsp'
    },

    created:function(){

        var that = this;

        that.$utils_link( that );

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params( that );

        that.init();
        that.termsShow = true;
    },
    methods: {

        /**
        *
        *
        *
        * 2018/8/10 上午11:58
        */
        init:function(){

            var that = this;

            that.loading_type = true;

            var params = {};

            let url = that.url.concat(`?processType=12CM_AGREE_CHECK&userNo=${that.key_custNo}&timeSeed=${Date.parse(new Date() )}`);

            that.$utils_echossHttpSend( url , params , 'GET' , function( res ){
                that.loading_type = false;
                console.log(res);

            },function( code , msg ){
                that.loading_type = false;
                console.log(msg);

            });

        }

    }

});