var vm = new Vue ({
    el:".container",
    data: {
        menuIdx: 0,
        menuList: [
            {
                name: '홈'
            },
            {
                name: '태마1'
            },
            {
                name: '태마2'
            },
            {
                name: '태마3'
            },
            {
                name: '태마4'
            },
            {
                name: '태마5'
            }
        ],
        menuShow: false,
        perLineFive: false, // category_box 에 한줄에 매뉴 노출 수량 4개 or 5개
        categoryIdx: 0,
        categoryList: [
            {
                'categoryType': '태마1',
                'parts': [
                    {
                        'iconMenu': 'images/icon_all_category.png',
                        'nameMenu': '전체1'
                    },
                    {
                        'iconMenu': 'images/icon_item01.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item02.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item03.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item04.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item05.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item06.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item07.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item08.png',
                        'nameMenu': '골프'
                    },
                ]
            },
            {
                'categoryType': '태마2',
                'parts': [
                    {
                        'iconMenu': 'images/icon_all_category.png',
                        'nameMenu': '전체2'
                    },
                    {
                        'iconMenu': 'images/icon_item01.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item02.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item03.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item04.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item05.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item06.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item07.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item08.png',
                        'nameMenu': '골프'
                    },
                ]
            },
            {
                'categoryType': '태마3',
                'parts': [
                    {
                        'iconMenu': 'images/icon_all_category.png',
                        'nameMenu': '전체3'
                    },
                    {
                        'iconMenu': 'images/icon_item01.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item02.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item03.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item04.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item05.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item06.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item07.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item08.png',
                        'nameMenu': '골프'
                    },
                ]
            },
            {
                'categoryType': '태마4',
                'parts': [
                    {
                        'iconMenu': 'images/icon_all_category.png',
                        'nameMenu': '전체4'
                    },
                    {
                        'iconMenu': 'images/icon_item01.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item02.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item03.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item04.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item05.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item06.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item07.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item08.png',
                        'nameMenu': '골프'
                    },
                ]
            },
            {
                'categoryType': '태마5',
                'parts': [
                    {
                        'iconMenu': 'images/icon_all_category.png',
                        'nameMenu': '전체5'
                    },
                    {
                        'iconMenu': 'images/icon_item01.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item02.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item03.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item04.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item05.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item06.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item07.png',
                        'nameMenu': '골프'
                    },
                    {
                        'iconMenu': 'images/icon_item08.png',
                        'nameMenu': '골프'
                    },
                ]
            }
        ],


        mainSwiper: [
            {swiperImg: 'images/img_main_banner01.png'},
            {swiperImg: 'images/img_main_banner02.png'}
        ],

        productList: [
            {
                productHref: 'details.html',
                productImg: 'images/product_item_01.jpg',
                brandName: 'Brand name',
                productName: 'product nameproduct nameproduct nameproduct nameproduct name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_02.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_03.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
            {
                productHref: 'details.html',
                productImg: 'images/product_item_04.jpg',
                brandName: 'Brand name',
                productName: 'product name',
                priceAfter: '3500'
            },
        ]
    },
    filters:{
        formatPoint:function(value,unit){
            unit = 'P';
            return parseInt(value).toLocaleString() + unit;
        }
    },
    mounted: function() {
        this.$nextTick(function() {

        })
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
    }
});

var mySwiper = new Swiper ('.main_swiper',{
    autoplay: {
        delay: 4000
    },
    loop: true,
    pagination: {
        el: '.main_pagination'
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
