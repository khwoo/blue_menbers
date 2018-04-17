var vm = new Vue ({
    el:".container",
    data: {
        menuIdx: 0,
        menuList: [
            {
                name: '홈'
            },
            {
                name: '태마'
            },
            {
                name: '업종'
            }
        ],
        menuShow: false,
        perLineFive: false,
        categoryIdx: 0,
        categoryTheme: [
            {
                iconMenu:'images/icon_all_category.png',
                nameMenu:'전체'
            },
            {
                iconMenu:'images/icon_item01.png',
                nameMenu:'골프'
            },
            {
                iconMenu:'images/icon_item02.png',
                nameMenu:'편리점'
            },
            {
                iconMenu:'images/icon_item03.png',
                nameMenu:'여행'
            },
            {
                iconMenu:'images/icon_item04.png',
                nameMenu:'자동차'
            },
            {
                iconMenu:'images/icon_item05.png',
                nameMenu:'서점'
            },
            {
                iconMenu:'images/icon_item06.png',
                nameMenu:'식사'
            },
            {
                iconMenu:'images/icon_item07.png',
                nameMenu:'식사'
            },
            {
                iconMenu:'images/icon_item08.png',
                nameMenu:'식사'
            },
        ],
        categoryIndustry: [
            {
                iconMenu:'images/icon_all_category.png',
                nameMenu:'전체'
            },
            {
                iconMenu:'images/icon_item01.png',
                nameMenu:'골프'
            },
            {
                iconMenu:'images/icon_item02.png',
                nameMenu:'편리점'
            },
            {
                iconMenu:'images/icon_item03.png',
                nameMenu:'여행'
            },
            {
                iconMenu:'images/icon_item04.png',
                nameMenu:'자동차'
            },
            {
                iconMenu:'images/icon_item05.png',
                nameMenu:'서점'
            },
            {
                iconMenu:'images/icon_item06.png',
                nameMenu:'식사'
            },
            {
                iconMenu:'images/icon_item07.png',
                nameMenu:'식사'
            },
            {
                iconMenu:'images/icon_item08.png',
                nameMenu:'식사'
            },
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
        filterCategoryTheme:function(){
            return this.categoryTheme.slice(1);
        },
        filterCategoryIndustry:function(){
            return this.categoryIndustry.slice(1);
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
