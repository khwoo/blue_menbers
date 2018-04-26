new Vue({
    el:'.container'
    ,data:{
        gift_message_main_url : ''
    }
    ,mounted : function(){

        var that = this;

        that.$utils_location_params(that);

        that.gift_message_main_url = [
            'gift_message_main.html'
            ,'?'
            ,'custNo=' + that.key_cid
            ,'&'
            ,'ticketNo=' + that.key_tid
            ,'&'
            ,'uid=' + that.key_uid
        ].join('');

    }
    ,methods:{



    }
});