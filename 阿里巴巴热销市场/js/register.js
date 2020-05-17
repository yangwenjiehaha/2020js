$(function(){
    let $btn=$('#btn'),
        $btnTwo=$('#btnTwo'),
        $declare=$('.declare'),
        $subject=$('.subject'),
        $lis=$('.container .change li'),
        $distinguishs=$('.distinguish');
    $btn.on('click',function(){
        $declare.hide();
        $subject.hide();
    })
    $btnTwo.on('click',function(){
        $declare.hide();
        $subject.hide();
    })
    $lis.on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        let n = $(this).index();
        $distinguishs.eq(n).addClass('active').siblings().removeClass('active');
        $declare.eq(n).show();
        $subject.eq(n).show();
    })
})