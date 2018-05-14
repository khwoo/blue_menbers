new Vue({

    el:".container",
    data: {
        brandName : ''
        ,lat : 0
        ,lng : 0

    },
    filters:{



    },
    mounted: function() {

        var that = this;

        that.$utils_location_params(that);

        that.lat        = that.key_lat;
        that.lng        = that.key_lng;

        that.brandName = "MAP";

        //that.brandName  = decodeURIComponent(that.key_title);


    }

});