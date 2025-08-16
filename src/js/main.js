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
    const CLASSNAME_ACTIVE = 'isActive';
    const BREAKPOINT = 768;

    /**
     * メニューの開閉状態を設定する
     * @param {boolean} isMenuOpen - メニューが開いているかどうかの状態
     */
    function setMenuState(isMenuOpen){
        // PCの場合 true
        if(window.innerWidth >= BREAKPOINT){
            $nav.removeAttr('aria-hidden inert');
            $hamburger.attr('aria-expanded', false);
            return;
        }
        
        $hamburger.toggleClass(CLASSNAME_ACTIVE, isMenuOpen).attr('aria-expanded', String(isMenuOpen)).attr('aria-label', isMenuOpen ? 'メニューを閉じる' : 'メニューを開く');

        $nav.toggleClass(CLASSNAME_ACTIVE, isMenuOpen).attr('aria-hidden', String(!isMenuOpen));
    }

    // 初期はオフ
    setMenuState(false);

    // トグル（クリック）— ここでだけ open/close を決める
    $hamburger.on('click', function(){
        if (window.innerWidth >= BREAKPOINT) return;
        const isMenuOpen = !$hamburger.hasClass(CLASSNAME_ACTIVE);
        setMenuState(isMenuOpen);
    })

    // ナビ内リンクを押したら閉じる
    $nav.on('click', 'a[href^="#"]', function(){
        setMenuState(false);
    });

    // Escキーで閉じる
    $(document).on('keydown', (e)=>{
        if(e.key === 'Escape') setMenuState(false);
    });

    // 「外側クリック」で閉じる closestが返した箱の中身が空（.length === 0）なら
    $(document).on('click', (e)=>{
        if (!$(e.target).closest('.site-nav, .hamburger').length) setMenuState(false);
    });


    // リサイズでPC幅に戻ったらリセット（状態の持ち越し事故防止）
    $(window).on('resize', function(){
        if(window.innerWidth >= BREAKPOINT) setMenuState(false);
    });


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