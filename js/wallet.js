
var vm = new Vue({
    el: '.container',
    data: {
        onReady:false,
    },

    mounted: function() {
        this.$nextTick(function() {
            this.onReady = !this.onReady;
        })
    },
    methods: {

    }

});









//
// "bizList": [
//     {
//         "bizCd": "BIZ000005",
//         "bizNm": "자동자",

//         "bizImg": "http://61.35.35.203:45260/file/icon_category_4.png"
//     },
//     {
//         "bizCd": "BIZ000004",
//         "bizNm": "여행",
//         "bizImg": "http://61.35.35.203:45260/file/icon_category_3.png"
//     },
//     {
//         "bizCd": "BIZ000003",
//         "bizNm": "생활·편의",
//         "bizImg": "http://61.35.35.203:45260/file/icon_category_2.png"
//     },
//     {
//         "bizCd": "BIZ000001",
//         "bizNm": "골프",
//         "bizImg": "http://61.35.35.203:45260/file/icon_category_1.png"
//     }
