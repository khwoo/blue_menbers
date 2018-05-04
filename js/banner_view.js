new Vue({

    el:".container",
    data: {
        link_url : ''
        ,widthStr:0
        ,heightStr:0
        ,brandName : '최인아책방'
    },
    filters:{



    },
    mounted: function() {

        var that = this;

        that.$utils_location_params(that);

        that.brandName = that.key_bannerNm;

        that.link_url = decodeURIComponent(that.key_linkUrl);

        setTimeout(function(){
        var height = window.innerWidth;
        var width = window.innerWidth;
        var nav_height = document.querySelector('.container_box').offsetHeight;

        that.widthStr = window.innerWidth;
        that.heightStr = window.innerHeight - nav_height;



        },1);
    }

});