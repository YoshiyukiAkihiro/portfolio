{
    MicroModal.init({
        disableScroll: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
      });

    const questions = [
        '好きな食べ物は何ですか？',
        '好きな動物はなんですか？',
        '最近面白かった事は何ですか？',
        '行ってみたい場所は？',
        'やってみたい事は？',
        '好きな音楽は？(ジャンル、曲など)',
        'たけのこの里、きのこの山どっちが好き？',
    ];

    const tips = [
        '相手に興味を持ち、相手の話を楽しく聞くように心掛けてみましょう。',
        '相手が話している間は相槌を打ったり、リアクションしてみましょう。',
        'クローズドクエスチョンで会話を進め、徐々にオープンクエスチョンを混ぜてみるといいでしょう。',
        '質問したい事があっても、一旦最後まで相手の話を聞きましょう。',
        '「でも」「だけど」とすぐに反論するのはやめましょう。',
        'お互いの違いを認め、すぐに否定してしまわないようにしましょう。',
        '無理して社交的になる必要はありません、少しずつ出来る事からやっていきましょう。',
        '相手の話を最後まで聞いた上で、必要であれば自分の意見を返してみましょう。',
        'メラビアンの法則によると、コミュニケーションから受け取る情報の55%が「表情、身ぶり手ぶり」38%が「口調、抑揚、語調」7%が「話した内容」になるそうです。',
    ];

    // HTML要素を取得
    let TipsChangeButton = document.querySelector('#TipsChangeButton');
    let QuestionChangeButton = document.querySelector('#QuestionChangeButton');
    let TransferButton = document.getElementById("TransferButton");
    let TransferButton2 = document.getElementById("TransferButton2");


    // ランダムな質問を配列から取得し、Webページに描画
    function RenderRandomQuestion() {
        const RandomQuestionsNumber = Math.floor(Math.random() * questions.length);
        const RandomQuestion = questions[RandomQuestionsNumber];
        // document.querySelector('.randomquestion').textContent = RandomQuestion;
        document.getElementById("randomquestion2").textContent = RandomQuestion;
    }


    // ランダムなtipsを配列から取得し、Webページに描画
    function RenderRandomTips() {
        const RandomTipsNumber = Math.floor(Math.random() * tips.length);
        const RandomTips = tips[RandomTipsNumber];
        document.getElementById("randomtips").textContent = RandomTips;
    }


    RenderRandomQuestion();
    RenderRandomTips();


    // tipsチェンジボタン
    TipsChangeButton.addEventListener("click", RenderRandomTips);


    // Questionチェンジボタン
    QuestionChangeButton.addEventListener('click', RenderRandomQuestion);


    // 送信ボタン(入力フォームの転写)
    function Transfer() {

        // 各テキストボックスの値を取得
        let inputText1 = document.getElementById("InputBox1").value;
        let inputText2 = document.getElementById("InputBox2").value;
        let inputText3 = document.getElementById("InputBox3").value;
        let inputText4 = document.getElementById("InputBox4").value;
        let inputText5 = document.getElementById("InputBox5").value;

        // ランダム質問の取得
        let currentQuestionText = document.getElementById("randomquestion2").textContent;

        // 新しいセクションの生成
        renderSection(inputText1, inputText2, inputText3, inputText4, inputText5, currentQuestionText);


        // テキストボックスの値を空白にする
        document.getElementById("InputBox1").value = '';
        document.getElementById("InputBox2").value = '';
        document.getElementById("InputBox3").value = '';
        document.getElementById("InputBox4").value = '';
        document.getElementById("InputBox5").value = '';

    }


    // HTML要素を生成して描画
    function renderSection(text1, text2, text3, text4, text5, question) {
        let sections = document.getElementById("sections");

        // <div class="section"> を作成
        let div = document.createElement("div");
        div.className = "section";

        // 描画するテキストリスト
        let texts = [
            "名前：" + text1,
            "趣味、特技：" + text2,
            "一番ハマっているもの：" + text3,
            "好きな動画：" + text4,
            question + "：",                           // ランダムな質問
            text5                                      //　ランダムな質問の回答
        ];

        // 要素を動的に作成して追加
        texts.forEach(text => {
            let p = document.createElement("p");                        // Javascript上で<p>タグを作成
            let span = document.createElement("span");
            span.textContent = text;
            p.appendChild(span);                                        // <p> の中に <span> を追加
            div.appendChild(p);                                     // <div> の中に <p> をいれる
        });

        sections.appendChild(div);                                  // id="sections"に<div>を追加
    }

    TransferButton.addEventListener('click', Transfer);


}