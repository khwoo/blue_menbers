var vm = new Vue ({
    el:".container",
    data: {
        navTitle: '쿠폰상세',
        couponDisable: true,
        couponUsed: true,
        usedDate: '2018-04-09 15:00',
        usedPlace: '플라자CC용인',
        expiryDate: '2018-04-09',

        productImg: 'images/product_item_04.jpg',
        barCodeImg: 'images/bar_code.png',
        stampMethod: false,
        brandName: 'Brand name',
        productName: 'Product name\n' +
        '상품명이 2줄일수 있겠죠?',
        useDate: '2018.12.31',
        couponNumber: '8033 0204 5002',

        noticeList: [
            {
                noticeTitle: '상품안내',
                productNotice: '결이 살아있는 패스트리를 프레즐 모양으로 만든 후, 파마산 가루를 뿌려 만든 패스트리로 짭쪼름한 맛이 특징입니다.'
            },
            {
                noticeTitle: '사용안내',
                productNotice: '매장에서 줄을 서지 않고 주문하는 쉽고 간편한 O2O (Online to Offline) 서비스로서 앱을 통해 스타벅스 음료, 푸드 및 원두의 결제 및 주문을 완료하면 매장에서 즉시 메뉴를 받을 수 있는 스타벅스 만의 신개념 서비스 입니다.'
            },
            {
                noticeTitle: '가맹점 점주',
                productNotice: '주소 : 서울특별시 중구 소공로 112 (소공동)(04533) <br/>' +
                '연락처 : +82-2-3015-1100'
            },
        ],

    },

    mounted: function() {
        this.$nextTick(function() {

        })
    },

    methods: {

    }
});

