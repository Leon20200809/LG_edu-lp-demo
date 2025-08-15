//
jQuery(document).ready(function($){
    /*=================================================
    AOS初期化
    ===================================================*/
    AOS.init(); 

    /*=================================================
    ハンバーガーメニュー on-off（スマホのみ）
    ===================================================*/


    const $hamburger = $('.hamburger');
    const $nav = $('.site-nav');

    function closeMenu(){
        $hamburger.removeClass('active');
        $nav.removeClass('active');
    }

    $hamburger.on('click', function() {
        $nav.toggleClass('active');
        $hamburger.toggleClass('active');
    });

    $nav.on('click', function(){
        closeMenu();
    })



    /*=================================================
    スムーススクロール
    ===================================================*/
    $('a[href^="#"]').click(function(event){
        event.preventDefault(); // デフォルトの動作（ページジャンプ）を防ぐ

        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top;
        $("html, body").animate({scrollTop:position}, 600, "swing");
    })


    /*=================================================
    チェックボックスの中身に応じて表示/非表示
    ===================================================*/
    $("#checkbox1").change(function(){
        if($(this).is(":checked")){
            $("#radio-options").fadeIn();
        } else {
            $("#radio-options").fadeOut();
        }
    });
});