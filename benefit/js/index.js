
var vm = new Vue({
    el: '.container',
    data: {
        productUrl : 'payment.html?'
        ,authStatus : false
        ,popdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''

        }
        ,popformdata : {

            alertOption : false
            ,alertTitle : ''
            ,alertContent : ''
            ,alertStyle : ''
            ,alertCall_1 : null
            ,alertCall_2 : null
            ,cancelShow : true

        }
    },

    created:function(){

        var that = this;

        that.$utils_link( that );

    },
    mounted: function() {

        var that = this;

        that.$utils_location_params( that );

        that.$utils_offeringPageOpen( that , function( msg ){

            that.authStatus = false;
            that.$utils_popup(that,true,'', msg );

            return;
        });

        that.productUrl = that.$utils_addPageParam( that , that.productUrl );
        that.authStatus = true;

        // var key = "33613763343635362D353932382D343266332D393564612D666431323135646536643439";
        // var tel = "01053664784";
        //
        // echossTracker.auth(key, tel, function(result) {
        //     console.log(result);
        // }, function(errorCode, errorMessage) {
        //     console.log("["+errorCode+"] "+errorMessage);
        // });
        //
        // echossTracker.pageOpen(key);
        // echossTracker.couponIssue(key);
        // echossTracker.couponUse(key);

    },
    methods: {

        productlist:function () {

            var that = this;

            location.href = that.productUrl;

        }

    }

});