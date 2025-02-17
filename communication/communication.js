{
    window.onload = function() {
        // if(document.getElementById("QuestionTransferButton")) {
        if(document.getElementById("questionSections")) {
            renderAllQuestions();
        }

        if (document.getElementById("profileSections")) {
            renderAllProfiles();
        }
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
    let TipsChangeButton = document.querySelector('#TipsChangeButton');                 // コミュニケーションのヒントを次に進めるボタン
    let QuestionChangeButton = document.querySelector('#QuestionChangeButton');             // 質問内容を他のものに変更するボタン
    let ProfileTransferButton = document.getElementById("ProfileTransferButton");       // プロフィールの送信ボタン
    let QuestionTransferButton = document.getElementById("QuestionTransferButton");         // 質問の送信ボタン


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
        let inputText1 = document.getElementById("InputBox1").value;
        let storageKey = "ProfileData";
        let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];

        let sameNameExist = savedData.find(entry => entry.name === inputText1);

        let newEntry = {
            name: document.getElementById("InputBox1").value,
            hobby: document.getElementById("InputBox2").value,
            favoriteThing: document.getElementById("InputBox3").value,
            favoriteVideo: document.getElementById("InputBox4").value
        };

        if(sameNameExist) {
            DataWithNoNameMatch = savedData.filter(entry => entry.name !== inputText1);         // テキストボックスに入力した名前と一致しないデータを配列として返す
            DataWithNoNameMatch.push(newEntry);
            localStorage.setItem(storageKey, JSON.stringify(DataWithNoNameMatch));
        } else {
            savedData.push(newEntry);
            localStorage.setItem(storageKey, JSON.stringify(savedData));
        }

        // プロフィールの描画
        renderAllProfiles();

        // テキストボックスの値を空白にする
        document.getElementById("InputBox1").value = "";
        document.getElementById("InputBox2").value = "";
        document.getElementById("InputBox3").value = "";
        document.getElementById("InputBox4").value = "";
    }



    // 質問内容をLocalStrageへ保存(送信ボタン)
    function QuestionSave() {
        let inputText1 = document.getElementById("InputBox1").value;
        let inputText5 = document.getElementById("InputBox5").value;
        let currentQuestionText = document.getElementById("randomquestion").textContent;

        let storageKey = "questionData";                                                        // LocalStrageのキーを指定
        let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];                     // LocalStrageからキーを指定して配列を取得

        let sameNameExist = savedData.find(entry => entry.name === inputText1);                    // 既に同じ名前のデータがあるか確認

        if(sameNameExist) {
            
            let existQuestion = sameNameExist.questions.find(q => q.question === currentQuestionText);       //　既存の質問の検索
            if(existQuestion) {                                                                         // 名前も質問も一致するものが存在する場合
                existQuestion.answer = inputText5;
            } else {
                sameNameExist.questions.push({ question:currentQuestionText, answer:inputText5});      // 既にLocalStrageに同じ名前が存在する場合、questionsの中に配列を
            }

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

        if(document.getElementById("QuestionTransferButton")) {
            renderAllQuestions();                                                                    // UIに反映
        }

        document.getElementById("InputBox1").value = "";
        document.getElementById("InputBox5").value = "";                                     // テキストボックスを全て空に
    }



    // プロフィール部分の描画
    function renderAllProfiles() {
        let sections = document.getElementById("profileSections");
        sections.innerHTML = "";
        let savedData = JSON.parse(localStorage.getItem("ProfileData")) || [];

        savedData.forEach(profiles => {
            let div = document.createElement("div");
            div.className = "section";
            
            let nameP = document.createElement("p");
            nameP.textContent = "名前：" + profiles.name;

            let hobbyP = document.createElement("p");
            hobbyP.textContent = "趣味、特技：" + profiles.hobby;
        
            let favoriteThingP = document.createElement("p");
            favoriteThingP.textContent = "一番ハマっているもの：" + profiles.favoriteThing;
            
            let favoriteVideoP = document.createElement("p");
            favoriteVideoP.textContent = "好きな動画(テレビ、ネット、サブスク、映画等)：" + profiles.favoriteVideo;

            // `div` に追加
            div.appendChild(nameP);
            div.appendChild(hobbyP);
            div.appendChild(favoriteThingP);
            div.appendChild(favoriteVideoP);

            // `profileSections` に追加
            sections.appendChild(div);
        });
    }



    // 質問部分の描画 (HTML要素を生成)
    function renderAllQuestions() {
        let sections = document.getElementById("questionSections");
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
        
            entry.questions.forEach(q => {                              // 
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
    
    // プロフィールをLocalStorageへ保存 (送信ボタン)
    if(document.getElementById("ProfileTransferButton")) {
        ProfileTransferButton.addEventListener('click', ProfileSave);
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