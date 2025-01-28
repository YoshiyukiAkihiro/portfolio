{
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

    // ランダムな質問を配列から取得し、Webページに描画
    function RenderRandomQuestion() {
        const RandomQuestionsNumber = Math.floor(Math.random() * questions.length);
        const RandomQuestion = questions[RandomQuestionsNumber];
        // document.querySelector('.randomquestion').textContent = RandomQuestion;
        document.querySelector('.randomquestion2').textContent = RandomQuestion;
    }

    // ランダムなtipsを配列から取得し、Webページに描画
    function RenderRandomTips() {
        const RandomTipsNumber = Math.floor(Math.random() * tips.length);
        const RandomTips = tips[RandomTipsNumber];
        document.querySelector('.randomtips').textContent = RandomTips;
    }

    RenderRandomQuestion();
    RenderRandomTips();

    // tipsチェンジボタン
    let TipsChangeButton = document.querySelector('#TipsChangeButton');
    TipsChangeButton.addEventListener("click", RenderRandomTips);

    // Questionチェンジボタン
    let QuestionChangeButton = document.querySelector('#QuestionChangeButton');
    QuestionChangeButton.addEventListener('click', RenderRandomQuestion);

    // 入力フォームの転写ボタン
    document.getElementById("TransferButton").addEventListener("click", function() {

        let inputText1 = document.getElementById("InputBox1").value;
        let inputText2 = document.getElementById("InputBox2").value;
        let inputText3 = document.getElementById("InputBox3").value;
        let inputText4 = document.getElementById("InputBox4").value;
        let inputText5 = document.getElementById("InputBox5").value;

        document.getElementById("OutputText1").textContent = inputText1;
        document.getElementById("OutputText2").textContent = inputText2;
        document.getElementById("OutputText3").textContent = inputText3;
        document.getElementById("OutputText4").textContent = inputText4;
        document.getElementById("OutputText5").textContent = inputText5;

        document.getElementById("InputBox1").value = '';
        document.getElementById("InputBox2").value = '';
        document.getElementById("InputBox3").value = '';
        document.getElementById("InputBox4").value = '';
        document.getElementById("InputBox5").value = '';



    });
}