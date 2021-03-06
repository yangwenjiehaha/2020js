//头部
$(function () {
    let $allA = $('.crosse'),
        $hiddenCard = $('.hiddenCard'),
        $common = $('.common'),
        $myAli=$('.myAli'),
        $pageA=$('.page a'),
        $navigationA=$('.navigation a');
    $common.mouseover(function () {
        $(this).css({
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #fff',
        });
        let m = $(this).index();
        $hiddenCard.eq(m-1).css({
            display: 'block',
        });
        $allA.eq(m-1).css({
            borderRight: 'none',
            borderLeft: 'none',
        });
        $allA.eq(m-2).css({
            borderRight: 'none',
        });
        window.m=m;

    })
    $myAli.mouseover(function(){
        $pageA.css({
            borderRight: 'none',
        })
        $navigationA.css({
            borderRight: '1px solid #f5f4f5',
        })
    })
    $myAli.mouseout(function(){
        $pageA.css({
            borderRight: '1px solid #f5f4f5',
        })
    })
    $common.mouseout(function(){
        $hiddenCard.eq(m-1).css({
            display: 'none',
        });
        $common.eq(m-1).css({
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: '1px solid #ccc',
        });
        $allA.eq(m-1).css({
            borderRight: '1px solid #f5f4f5',
        });
        $allA.eq(m-2).css({
            borderRight: '1px solid #f5f4f5',
        });
    })
})

// 轮播图
$(function () {
    let $container = $('.contentWrapper .container'),
        $slideList = $('.slide'),
        $paginationList = $container.find('.pagination>li'),
        $changeLeft = $container.children('.changeLeft'),
        $changeRight = $container.children('.changeRight'),
        $slideContent = $('.contentWrapper .slideContent');
    let step = 0,
        prev = 0,
        interval = 3000,
        autoTimer = null,
        len = $slideList.length;
    //实现切换
    function change() {
        let $cur = $slideList.eq(step),
            $pre = $slideList.eq(prev);
        $cur.css('zIndex', 1);
        $pre.css('zIndex', 0);

        $cur.css({
            transitionDuration: '.3s',
            opacity: 1
        }).one('transitionend', () => {
            $pre.css({
                transitionDuration: '0s',
                opacity: 0
            });
        })

        //焦点对齐
        $paginationList.each((index, item) => {
            if (index === step) {
                $(item).addClass('active');
                return;
            }
            $(item).removeClass('active');
        });
    }
    //自动切换
    function autoMove() {
        prev = step;
        step++;
        step > (len - 1) ? step = 0 : null;
        change();
        bgColor();
    }
    autoTimer = setInterval(autoMove, interval);

    //鼠标进入时
    $container.mouseenter(function () {
        clearInterval(autoTimer);
    })
    //鼠标离开时
    $container.mouseleave(function () {
        autoTimer = setInterval(autoMove, interval);
    })

    // 点击焦点切换
    $paginationList.on('click', function () {
        let index = $(this).index();
        if (index === step) return;
        prev = step;
        step = index;
        change();
        bgColor();
    });

    // 点击左右按钮实现切换
    $changeRight.on('click', autoMove);
    $changeLeft.on('click', function () {
        prev = step;
        step--;
        step < 0 ? step = len - 1 : null;
        change();
        bgColor();
    });

    //大盒子背景色随着图片的改变而改变
    function bgColor() {
        if (step === 0) {
            $slideContent.css('backgroundColor', 'rgb(251, 56, 2)');
        } else if (step === 1) {
            $slideContent.css('backgroundColor', 'rgb(255, 8, 82)');
        } else if (step === 2) {
            $slideContent.css('backgroundColor', 'rgb(250, 105, 102)');
        } else if (step === 3) {
            $slideContent.css('backgroundColor', 'rgb(255, 255, 255)');
        } else if (step === 4) {
            $slideContent.css('backgroundColor', 'rgb(254, 146, 161)');
        }
    }

});

//侧边栏
$(function () {
    let $listAll = $('#listAll'),
        $lis = $listAll.children('li'),
        $hidden = $('#hidden'),
        $hiddenlis = $hidden.children('li'),
        $asideLeft = $('.asideLeft'),
        $dlAll=$('#hidden .clothing dl');
    $lis.mouseover(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let n = $(this).index();
        $hiddenlis.eq(n).addClass('active').siblings().removeClass('active');
        window.n = n;
    })
    $lis.mouseout(function () {
        $(this).removeClass('active');
    })
    $asideLeft.mouseout(function () {
        $hiddenlis.removeClass('active');
    })
    $hidden.mouseover(function () {
        $hiddenlis.eq(n).addClass('active');
    })
    /* $listAll.mouseover(function(){
        $hidden.css({
            width: '965px',
            boxShadow:'1px 1px 10px #ccc',
            transition:'all .2s',
        })
    })
    $listAll.mouseout(function(){
        $hidden.css({
            width: '0px',
            boxShadow:'none',
            transition:'0',
        })
    }) */



})

//渲染页面
$(function () {
    let $source = $('#source'),
        $contents = $('#contents'),
        $ulList = $('#ulList'),
        data = [],
        count = 0,
        $guess=$('.guess');

    //请求数据1
    let dataQuery1 = function dataQuery1() {
        $.ajax({
            url: './json/special.json',
            method: 'get',
            async: true,
            dataType: 'json',
            success: result => {
                data = result;
                render1();
                lazyBigImages();
                lazySmallImage();
            }
        })
    }
    dataQuery1();
    //渲染数据1
    let render1 = function render1() {
        let str = ``;
        var dataPublic = data['data'];
        dataPublic.forEach(item => {
            let {
                img
            } = item,
            dataInfo = item['info'];
            str += `<div class="lottery clearfix">
            <div class="imgBox">
                <a href="">
                    <img src="" data-image="${img}" alt="">
                </a>
            </div>
            <ul class="clearfix">`;

            dataInfo.forEach(item => {
                let {
                    title,
                    pic,
                    url
                } = item;
                str += `
                <a href="${url}">
                <li>
                    <p>${title}</p>
                    <img src="" small-image="${pic}" alt="">
                </li>
            </a>`;
            })
            str += ` </ul>
            </div>`;

            $source.html(str);
        })
    }
    // render1();


    //请求数据2
    let dataQuery2 = function dataQuery2() {
        $.ajax({
            url: './json/hotType.json',
            method: 'get',
            async: true,
            dataType: 'json',
            success: result => {
                data = result;
                render2();
                bigImage();
                smallImage();
            }
        })
    }
    dataQuery2();

    //渲染数据2
    let render2 = function render2() {
        let str = ``,
            dataPublic = data['data'];
        dataPublic.forEach((item, index) => {
            let {
                img
            } = item,
            links = item['link'],
                infos = item['info'];
            str += `<div class="enterprise clearfix">
        <div class="typeBox">
            <h2>家装建材</h2>
            <div class="imgLink">
                <img src="" big="${img}" alt="">
            </div>
            <div class="mold">`;
            links.forEach((item, index) => {

                str += `<a href="${item.url}">${item.name}</a>`
            })

            str += `</div>
        </div>
        <ul class="commodity clearfix">`;
            infos.forEach((item, index) => {
                str += `
            <li>
                <a href="${item.url}">
                    <img src="" small="${item.pic}" alt="">
                    <p>${item.title}</p>
                </a>
                <h5 class="clearfix">
                    <span>￥${item.pice.toFixed(2)}</span>
                    <span>已售${item.sold}</span>
                </h5>
            </li>`
            })
            str += `</ul>
        <div class="shopModule">
            <a href="">
                <img src="images/store.jpg" alt="">
            </a>
            <a href="">
                <img src="images/store2.jpg" alt="">
            </a>
            <a href="">
                <img src="images/store3.jpg" alt="">
            </a>
            <a href="">
                <img src="images/store4.jpg" alt="">
            </a>
            <a href="">
                <img src="images/store5.jpg" alt="">
            </a>
        </div>
    </div>`;

            $contents.html(str);
        })
    }
    // render2();


    //请求数据3
    let dataQuery3 = function dataQuery3() {
        $.ajax({
            url: './json/moduleShop.json',
            async: false,
            dataType: 'json',
            method: 'get',
            success: result => {
                data = result;
                /* lazyImgThree();
                render3(); */
                /* window.addEventListener('scroll',function(){
                    lazyImgThree();
                    loadMore();
                }) */
            }
        })

    }
    //dataQuery3();

    //渲染数据3
    let render3 = function render3() {
        let str = ``,
            dataModule = data['data'];
        // console.log(dataModule);
        dataModule.forEach((item, index) => {
            let {
                title,
                pic,
                pice,
                sold,
                number
            } = item;
            str += `<li>
            <img src="" data-img="${pic}" alt="">
            <p class="clearfix">
                <span>￥</span>
                <span>${pice}/个</span>
                <span>${sold}天成交${number}件</span>
            </p>
            <h5><a href="javascript;">${title}</a></h5>
        </li>`;

        })
        $ulList.append(str);
    }
    //render3();

    //图片延迟加载部分一
    let lazyBigImages = function lazyImages() {
        let $bigImages = $('#source .imgBox img'),
            $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop();
        [...$bigImages].forEach((item, index) => {
            let $item = $(item);
            if ($item.css('opacity') === 1) return;
            let h = $item.offset().top;
            if (T > h) {
                let src = $item.attr('data-image');
                $item.attr('src', src);
                $item.on('load', function () {
                    $item.css('opacity', 1);
                })
            }
        })
    }
    let lazySmallImage = function lazySmallImage() {
        let $smallImage = $('#source ul li img'),
            $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop();
        [...$smallImage].forEach((item, index) => {
            let $item = $(item);
            if ($item.css('opacity') === 1) return;
            let h = $item.offset().top;
            if (T > h) {
                let src = $item.attr('small-image');
                $item.attr('src', src);
                $item.on('load', function () {
                    $item.css('opacity', 1);
                })
            }
        })
    }

    //图片延迟加载部分二
    let bigImage = function bigImage() {
        let $bigImages = $('#contents .imgLink img'),
            $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop();
        [...$bigImages].forEach((item, index) => {
            let $item = $(item);
            if ($item.css('opacity') === 1) return;
            let h = $item.offset().top;
            if (T > h) {
                let src = $item.attr('big');
                $item.attr('src', src);
                $item.on('load', function () {
                    $item.css('opacity', 1);
                })
            }
        })
    }
    let smallImage = function smallImage() {
        let $smallImage = $('#contents ul li img'),
            $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop();
        [...$smallImage].forEach((item, index) => {
            let $item = $(item);
            if ($item.css('opacity') === 1) return;
            let h = $item.offset().top;
            if (T > h) {
                let src = $item.attr('small');
                $item.attr('src', src);
                $item.on('load', function () {
                    $item.css('opacity', 1);
                })
            }
        })
    }

    //图片延迟加载三
    let lazyImgThree = function lazyImgThree() {
        let $bigImage = $('#ulList li img'),
            $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop();
        [...$bigImage].forEach((item, index) => {
            let $item = $(item);
            if ($item.css('opacity') === 1) return;
            let h = $item.offset().top;
            if (T >= h) {
                let src = $item.attr('data-img');
                $item.attr('src', src);
                $item.on('load', function () {
                    $item.css('opacity', 1);
                })
            }
        })
    }
    //加载更多三
    let isRender;
    let loadMore = function () {
        let $window = $(window);
        let T = $window.outerHeight() + $window.scrollTop(),
            h = $ulList.offset().top + $ulList.outerHeight();
        if (h <= T) {
            count++;
            if (count > 3) return;
            if (isRender) return;
            isRender = true;
            dataQuery3();
            lazyImgThree();
            render3();
            isRender = false;
        }
    }

    window.onscroll = function () {
        lazyBigImages();
        lazySmallImage();
        bigImage();
        smallImage();
        lazyImgThree();
        loadMore();
    }

})
//回到顶部
$(function(){
    let $goto = $('.main');
    window.addEventListener('scroll',function(){
        let st = $(window).scrollTop(),
            ch = $(window).height(); 
        if (st > ch) {
            $goto.css({
                display:'block'
            })
        } else {
           $goto.css({
            display : 'none'
           })
        }
    })

$goto.on('click',function () {
        if(this.isGoing)return;
        this.isGoing = true;
        let t = $(window).scrollTop(); 
        let step = t/10;
        let timer = setInterval(() => {
            t -= step;
            if(t < 0){
            t = 0;
            clearInterval(timer);
            this.isGoing = false;
            }
            document.documentElement.scrollTop = t;
        }, 10);

})
})