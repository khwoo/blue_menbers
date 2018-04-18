
var vm = new Vue({
    el: '.container',
    data: {
        onReady:false,
        bizlist : [
                {
                    "categoryCd": "CTG0001CT0001",
                    "groupId" : "CTG0001",
                    "categoryNm": "골프",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_4.png",
                    "url" : "main.html?key_custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0001"
                },
                {
                    "categoryCd": "CTG0001CT0002",
                    "groupId" : "CTG0001",
                    "categoryNm": "생화 편의",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_3.png",
                    "url" : "main.html?key_custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0002"
                },
                {
                    "categoryCd": "CTG0001CT0003",
                    "groupId" : "CTG0001",
                    "categoryNm": "여행",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_2.png",
                    "url" : "main.html?key_custNo=00012105&menuIdx=CTG0001&categoryIdx=CTG0001CT0003"
                },
                {
                    "categoryCd": "CTG0002CT0001",
                    "groupId" : "CTG0002",
                    "categoryNm": "도서테마",
                    "bizImg": "http://61.35.35.203:45260/file/icon_category_1.png",
                    "url" : "main.html?key_custNo=00012105&menuIdx=CTG0002&categoryIdx=CTG0002CT0001"
                }
        ]
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

