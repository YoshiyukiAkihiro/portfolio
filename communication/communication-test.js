{
    window.onload = function() {
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
        let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];                     // 配列ProfileDataをJSON形式の文字列をJSONオブジェクトに変換　　　 JSON形式の文字列の例 → "[{\"name\":\"Alice\",\"hobby\":\"Reading\"},{\"name\":\"Bob\",\"hobby\":\"Gaming\"}]"

        let sameNameExist = savedData.find(entry => entry.name === inputText1);                 // 配列ProfileData →　name: inputText1　に最初に当てはまるオブジェクトを返す

        let newEntry = {                                                                        // Webブラウザ上のテキストボックス内の値をオブジェクトに入れる
            name: document.getElementById("InputBox1").value,
            hobby: document.getElementById("InputBox2").value,
            favoriteThing: document.getElementById("InputBox3").value,
            favoriteVideo: document.getElementById("InputBox4").value
        };

        if(sameNameExist) {                                                                     // 既にlocalstorageの　ProfileData → name: inputText1 が存在する場合
            DataWithNoNameMatch = savedData.filter(entry => entry.name !== inputText1);             // テキストボックスに入力した名前と一致しないデータを配列として返す
            DataWithNoNameMatch.push(newEntry);
            localStorage.setItem(storageKey, JSON.stringify(DataWithNoNameMatch));
        } else {                                                                                // 存在しない場合はlocalstorageの配列に追加する
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



    // 質問内容をLocalStorageへ保存(送信ボタン)
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
                questions: [{question: currentQuestionText, answer: inputText5}]
            };
            savedData.push(newEntry);
        }

        localStorage.setItem(storageKey,JSON.stringify(savedData));                                     // LocalStrageの更新

        if(document.getElementById("QuestionTransferButton")) {
            renderAllQuestions();                                                                       // UIに反映
        }

        document.getElementById("InputBox1").value = "";                                                // テキストボックスを全て空に
        document.getElementById("InputBox5").value = "";
    }



    // プロフィール部分の描画
    function renderAllProfiles() {
        let sections = document.getElementById("profileSections");
        sections.innerHTML = "";
        let savedData = JSON.parse(localStorage.getItem("ProfileData")) || [];                          // JSON形式で書かれた文字列をJavaScriptのJSONオブジェクトに変換する

        savedData.forEach(ProfileData => {                                                                              //  <div class="profileSection">
            let div = document.createElement("div");                                                                    //      <p>名前：吉行昭洋</p>                                                  localsrorage → profileData → {"name": "吉行昭洋", "hobby": "ゲーム", "favoriteThing": "ゲーム", "favoriteVideo": "youtube"}
            div.className = "profileSection";                                                                           //      <p>趣味、特技：ゲーム</p>
                                                                                                                        //      <p>一番ハマっているもの：ゲーム</p>
            let nameP = document.createElement("p");                                                                    //      <p>好きな動画(テレビ、ネット、サブスク、映画等)：youtube</p>
            nameP.textContent = "名前：" + ProfileData.name;                                                            //       <button class="delete-button" data-name="吉行昭洋">全て削除</button>
                                                                                                                        //  </div>
            let hobbyP = document.createElement("p");
            hobbyP.textContent = "趣味、特技：" + ProfileData.hobby;
        
            let favoriteThingP = document.createElement("p");
            favoriteThingP.textContent = "一番ハマっているもの：" + ProfileData.favoriteThing;
            
            let favoriteVideoP = document.createElement("p");
            favoriteVideoP.textContent = "好きな動画(テレビ、ネット、サブスク、映画等)：" + ProfileData.favoriteVideo;

            let profileDeleteButton = document.createElement("button");                                            // ボタン要素生成 → テキストとクラスを付与 → data-name="" localStorageのProfileDataオブジェクト内の キー:name に対応する要素を入れる
            profileDeleteButton.textContent = "全て削除";
            profileDeleteButton.className = "delete-button";
            profileDeleteButton.setAttribute("data-name", ProfileData.name);

            profileDeleteButton.addEventListener("click", () => {                                                  // 削除ボタンのイベントリスナー
                deleteProfile(ProfileData.name);
            });
            
            div.appendChild(nameP);                             // <div class="profileSection"></div>　に入れる
            div.appendChild(hobbyP);
            div.appendChild(favoriteThingP);
            div.appendChild(favoriteVideoP);
            if (document.title === "管理ページ") {
                div.appendChild(profileDeleteButton);
            };

            sections.appendChild(div);
        });
    }

    // 管理ページリンクをクリックした際のパスワード入力関数
    function gate() {
        let UserInput = prompt("パスワードを入力して下さい:","");
        if (UserInput !== null) {
            location.href = UserInput + ".html";                                    // パスワードが入力されたら管理ページへ遷移
        }
    }

    // 指定した名前のプロフィールデータを削除する関数
    function deleteProfile(ProfileData_name) {
        let storageKey = "ProfileData";
        let profileSavedData = JSON.parse(localStorage.getItem(storageKey)) || [];

        let updateProfileData = profileSavedData.filter(profileData => profileData.name !== ProfileData_name);

        localStorage.setItem(storageKey, JSON.stringify(updateProfileData));

        renderAllProfiles()
    }


    // 質問部分の描画 (HTML要素を生成)
    function renderAllQuestions() {
        let sections = document.getElementById("questionSections");
        sections.innerHTML = "";

        let savedData = JSON.parse(localStorage.getItem("questionData")) || [];

        
        savedData.forEach(questionData => {                                     //  <div class="questionSection">
            let div = document.createElement("div");                            //      <p>名前：</p>
            div.className = "questionSection";                                  //      <p>吉行昭洋</p>                          localstorage → questionData → {name: "吉行昭洋"}
            let p = document.createElement("p");                                //  </div>
            p.textContent = "名前："
            let nameP = document.createElement("p");
            nameP.textContent = questionData.name;
            div.appendChild(p);
            div.appendChild(nameP);
            
            questionData.questions.forEach(q => {                               //  <p>
                let questionP = document.createElement("p");                    //      <span>やってみたい事は？</span>           localstorage → questions → {question: "", answer: ""}
                let questionSpan = document.createElement("span");              //  </p>
                questionSpan.textContent = q.question + ":";                    //  <p>
                questionP.appendChild(questionSpan);                            //      <span>空を飛ぶ</span>
                                                                                //  </p>
                let answerP = document.createElement("p");
                let answerSpan = document.createElement("span");
                answerSpan.textContent = q.answer;
                answerP.appendChild(answerSpan);
    
                div.appendChild(questionP);                                     //  <div class="questionSection"></div>　に<p>要素を入れる
                div.appendChild(answerP);
            });

            let questionDeleteButton = document.createElement("button");                        // ボタン要素を生成 → テキストとクラス付与 → data-name = "" localstorageのquestionDataオブジェクトのキー：nameを付与
            questionDeleteButton.textContent = "全て削除";
            questionDeleteButton.className = "delete-button";
            questionDeleteButton.setAttribute("data-name", questionData.name);
            
            
            questionDeleteButton.addEventListener("click", () => {                // 削除ボタンのイベントリスナー
                deleteQuestion(questionData.name);                                  // localstorage → questionData → name: "ここが引数"
            });

            if (document.title === "管理ページ") {                                 // 管理ページなら削除ボタンをつける
                div.appendChild(questionDeleteButton);
            };

            sections.appendChild(div);                                  // id="sections"に<div>を追加
        });
    }

    // 1人分の質問データ削除
    function deleteQuestion(questionData_name) {
        let storageKey = "questionData";
        let questionSavedData = JSON.parse(localStorage.getItem(storageKey)) || [];
        let updateQuestionData = questionSavedData.filter(questionData => questionData.name !== questionData_name);
        localStorage.setItem(storageKey, JSON.stringify(updateQuestionData));
        renderAllQuestions()
    }

    if(document.title === "メインページ") {
        TipsChangeButton.addEventListener("click", RenderRandomTips);           // tipsチェンジボタン
        ProfileTransferButton.addEventListener('click', ProfileSave);                     // プロフィールをLocalStorageへ保存 (送信ボタン)
        RenderRandomTips();                                             // ランダムなコミュニケーションのヒント
    };

    if(document.title === "質問共有ページ") {
        QuestionTransferButton.addEventListener('click', QuestionSave);                     // 質問をLocalStorageへ保存 (送信ボタン)
        QuestionChangeButton.addEventListener('click', RenderRandomQuestion);                   // Questionチェンジボタン
        RenderRandomQuestion();                                                 // ランダム質問の描画
    };
}