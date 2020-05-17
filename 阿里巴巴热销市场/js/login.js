$(function(){
    let $mode=$('#mode'),
        $logins=$('#mode a'),
        $passLogin=$('.changeLogin .passLogin'),
        $chan=$('.scanning'),
        $com=$('.com'),
        $dimensional=$('.dimensional');
    $logins.click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let n = $(this).index();
        $passLogin.eq(n).addClass('active').siblings().removeClass('active');
    })

    $chan.click(function(){
        $dimensional.css({
            display: 'block'
        })
    })
    $com.click(function(){
        $dimensional.css({
            display:'none',
        })
    })
})