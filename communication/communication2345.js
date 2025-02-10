{
    window.onload = function() {
        renderAllQuestions();
    };

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
    let ProfileTransferButton = document.getElementById("ProfileTransferButton");
    let QuestionTransferButton = document.getElementById("QuestionTransferButton");

    // ランダムな質問をWebページに描画
    function RenderRandomQuestion() {
        const RandomQuestionsNumber = Math.floor(Math.random() * questions.length);
        const RandomQuestion = questions[RandomQuestionsNumber];
        document.getElementById('randomquestion').textContent = RandomQuestion;
    }


    // ランダムなtipsをWebページに描画
    function RenderRandomTips() {
        const RandomTipsNumber = Math.floor(Math.random() * tips.length);
        const RandomTips = tips[RandomTipsNumber];
        document.getElementById("randomtips").textContent = RandomTips;
    }


    // プロフィールをLocalStorageへ保存(送信ボタン)
    function ProfileSave() {
        // 各テキストボックスの値を取得
        let inputText1 = document.getElementById("InputBox1").value;
        let inputText2 = document.getElementById("InputBox2").value;
        let inputText3 = document.getElementById("InputBox3").value;
        let inputText4 = document.getElementById("InputBox4").value;

        let storageKey = "ProfileData";
        let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];

        let filteredData = savedData.filter(entry => entry.name !== inputText1);
        localStorage.setItem(storageKey, JSON.stringify(filteredData));

        let newEntry = {
            name: inputText1,
            hobby: inputText2,
            favoriteThing: inputText3,
            favoriteVideo: inputText4
        };
        savedData.push(newEntry);

        // 新しいセクションの生成
        renderSection(inputText1, inputText2, inputText3, inputText4);

        // テキストボックスの値を空白にする
        document.getElementById("InputBox1").value = '';
        document.getElementById("InputBox2").value = '';
        document.getElementById("InputBox3").value = '';
        document.getElementById("InputBox4").value = '';
    }


    // 質問内容をLocalStrageへ保存(送信ボタン)
    function QuestionSave() {
        let inputText1 = document.getElementById("InputBox1").value;
        let inputText5 = document.getElementById("InputBox5").value;
        let currentQuestionText = document.getElementById("randomquestion").textContent;

        let storageKey = "questionData";                                                        // LocalStrageのキーを指定
        let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];                     // LocalStrageからキーを指定して配列を取得

        let existEntry = savedData.find(entry => entry.name === inputText1);                    // 既に同じ名前のデータがあるか確認

        if(existEntry) {

            if (!existEntry.questions) {
                existEntry.questions = [];
            }
            existEntry.questions.push({ question:currentQuestionText, answer:inputText5});      // 既にLocalStrageに同じ名前が存在する場合、questionsの中に配列を

        } else {
            let newEntry = {
                name: inputText1,
                questions: [
                    {question: currentQuestionText, answer: inputText5}
                ]
            };
            savedData.push(newEntry);
        }

        console.log("保存前のデータ:", savedData);                                                      // デバッグ用
        localStorage.setItem(storageKey,JSON.stringify(savedData));                              // LocalStrageの更新
        console.log("保存後のデータ:", JSON.parse(localStorage.getItem(storageKey)));                   // デバッグ用

        renderAllQuestions();                                                                    // UIに反映

        document.getElementById("InputBox1").value = "";
        document.getElementById("InputBox5").value = "";

    }



    // 質問部分の描画 (HTML要素を生成)
    function renderAllQuestions() {
        let sections = document.getElementById("sections");
        sections.innerHTML = "";                                    // 既存の表示をクリア

        let savedData = JSON.parse(localStorage.getItem("questionData")) || [];


        savedData.forEach(entry => {                                     // HTMLタグを作成して描画
            let div = document.createElement("div");                    // <div class="section"> を作成
            div.className = "section";
            let p = document.createElement("p");                        // Javascript上で<p>タグを作成
            let span = document.createElement("span");
            span.textContent = "名前：" + entry.name;
            div.appendChild(p);                                     // <div> の中に <p> をいれる
            p.appendChild(span);                                        // <p> の中に <span> を追加
        
            entry.questions.forEach(q => {
                let questionP = document.createElement("p");
                let questionSpan = document.createElement("span");
                questionSpan.textContent = q.question + ":";
                questionP.appendChild(questionSpan);
    
                let answerP = document.createElement("p");
                let answerSpan = document.createElement("span");
                answerSpan.textContent = q.answer;
                answerP.appendChild(answerSpan);
    
                div.appendChild(questionP);
                div.appendChild(answerP);
            });

            sections.appendChild(div);                                  // id="sections"に<div>を追加
        });
    }



    // tipsチェンジボタン
    if(document.getElementById("TipsChangeButton")) {
        TipsChangeButton.addEventListener("click", RenderRandomTips);
    };

    // Questionチェンジボタン
    if(document.getElementById("QuestionChangeButton")) {
        QuestionChangeButton.addEventListener('click', RenderRandomQuestion);
    };
    
    // 送信ボタン押下時に転写
    if(document.getElementById("ProfileTransferButton")) {
        ProfileTransferButton.addEventListener('click', ProfileTransfer);
    };

    // 質問をLocalStorageへ保存 (送信ボタン)
    if(document.getElementById("QuestionTransferButton")) {
        QuestionTransferButton.addEventListener('click', QuestionSave);
    };

    // ランダム質問の描画
    if(document.getElementById("randomquestion")) {
        RenderRandomQuestion();
    };
    
    // ランダムなコミュニケーションのヒント
    if(document.getElementById("randomtips")) {
    RenderRandomTips();
    };

}