'use strict';

// ハンバーガーメニュー用
{
    const HamburgerOpen = document.getElementById('HamburgerOpen');
    const HamburgerOverlay = document.querySelector('.HamburgerOverlay');
    const HamburgerClose = document.getElementById('HamburgerClose');
    const HamburgerOverlaylinks = document.querySelectorAll('.link');   // ※保留

    HamburgerOpen.addEventListener('click', () => {
        HamburgerOverlay.classList.add('show');                                     // ハンバーガーアイコンクリック時に、メニューに「show」クラスを付与、バーガーアイコンに「hide」クラスを付与
        HamburgerOpen.classList.add('hide');
    });

    function handleClose() {                                                        // クリック時の共通の処理
        HamburgerOverlay.classList.remove('show');
        HamburgerOpen.classList.remove('hide');
    };

    HamburgerClose.addEventListener('click', handleClose);                           //  バツアイコンクリック時のイベントリスナー
    HamburgerOverlaylinks.forEach(link => {                                         //  ハンバーガーメニューのリンククリック時のイベントリスナー
        link.addEventListener('click', handleClose);
    });
};

// スムーススクロール用
{

const anchorlinks = document.querySelectorAll('a[href^="#"]');                      //　href属性の#で始まるリンクをすべて取得
anchorlinks.forEach((anchorlink) =>{                                                // 各リンク毎に処理を実行
    anchorlink.addEventListener('click', (event) => {                               // クリック時の処理
        event.preventDefault();                                                     // デフォルトの挙動を無効化(リンクのジャンプ)
        const targethref = anchorlink.getAttribute('href');                         //  クリックされたリンクのhref属性を取得
        const targetElement = document.querySelector(targethref);                   //  hrefの値に対応する要素を取得
        const targetElementTop = targetElement.getBoundingClientRect().top;         //  定数targetElementの画面上端からの相対位置を取得
        const currentScrollY = window.scrollY;                                      //　現在のスクロール位置を取得(Y座標)
        const headerHeight = document.querySelector('header').offsetHeight;         //　ヘッダーの高さを動的に取得
        const scrollTargetY = targetElementTop + currentScrollY - headerHeight;     //　スクロールする目的地のY座標を計算
        window.scrollTo({
            top: scrollTargetY,
                behavior: 'smooth',
        });
    });
});
}

// デバッグ用 
document.addEventListener('DOMContentLoaded', () => {
    const HamburgerOverlaylinks = document.querySelectorAll('.link');
    console.log(HamburgerOverlaylinks); 
});