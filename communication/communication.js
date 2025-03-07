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
        '遊ぶなら？「インドア」「アウトドア」',
        'どっちの天気が好き？「晴れ」「雨」',
        'どっちの季節が好き？「夏」「冬」',
        '目玉焼きにかけるのは「醤油」？「ソース」？',
        'どっちが好き？「パン」「ご飯」',
        '飼うならどっち？「犬」「猫」',
        '買うならどっち？「たけのこの里」「きのこの山」',
        'どっちが好き？「甘いもの」「辛いもの」',
        'どっちが好き？「漫画」「小説」',
        '好きな魚介類は？「エビ」「カニ」',
        'どっちが好き？「肉」「魚」',
        'どっちが欲しい？「どこでもドア」「タイムマシン」',
        '好きな食べ物は「最初に食べる」「最後に食べる」',
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
    const TipsChangeButton = document.querySelector("#TipsChangeButton");                 // コミュニケーションのヒントを次に進めるボタン
    const QuestionChangeButton = document.querySelector("#QuestionChangeButton");             // 質問内容を他のものに変更するボタン
    const ProfileTransferButton = document.getElementById("ProfileTransferButton");       // プロフィールの送信ボタン
    const QuestionTransferButton = document.getElementById("QuestionTransferButton");         // 質問の送信ボタン
    const adminLink = document.getElementById("adminLink");                               // 管理ページへのリンク
    const inputElements = document.querySelectorAll(".input");

    // ランダムな質問をWebページに描画
    function RenderRandomQuestion() {
        const RandomQuestionsNumber = Math.floor(Math.random() * questions.length);
        const RandomQuestion = questions[RandomQuestionsNumber];
        document.getElementById("randomquestion").textContent = RandomQuestion;
    }

    // ランダムなtipsをWebページに描画
    function RenderRandomTips() {
        const RandomTipsNumber = Math.floor(Math.random() * tips.length);
        const RandomTips = tips[RandomTipsNumber];
        document.getElementById("randomtips").textContent = RandomTips;
    }

    // プロフィールをLocalStorageへ保存(送信ボタン)
    function ProfileSave() {
        const inputText1 = document.getElementById("InputBox1").value;
        const storageKey = "ProfileData";
        const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];                     // 配列ProfileDataをJSON形式の文字列をJSONオブジェクトに変換　　　 JSON形式の文字列の例 → "[{\"name\":\"Alice\",\"hobby\":\"Reading\"},{\"name\":\"Bob\",\"hobby\":\"Gaming\"}]"
        const sameNameExist = savedData.find(entry => entry.name === inputText1);                     // 配列ProfileData →　name: inputText1　に最初に当てはまるオブジェクトを返す

        const newEntry = {                                                                        // Webブラウザ上のテキストボックス内の値をオブジェクトに入れる
            name: document.getElementById("InputBox1").value,
            hobby: document.getElementById("InputBox2").value,
            favoriteThing: document.getElementById("InputBox3").value,
            favoriteVideo: document.getElementById("InputBox4").value
        };

        if(sameNameExist) {                                                                     // 既にlocalstorageの　ProfileData → name: inputText1 が存在する場合
            DataWithNoNameMatch = savedData.filter(entry => entry.name !== inputText1);             // テキストボックスに入力した名前と 一致しないデータを配列として返す
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
        const inputText1 = document.getElementById("InputBox1").value;
        const inputText5 = document.getElementById("InputBox5").value;
        const currentQuestionText = document.getElementById("randomquestion").textContent;

        const storageKey = "questionData";                                                        // LocalStorageのキーを指定
        const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];                     // LocalStorageからキーを指定して配列を取得
        const sameNameExist = savedData.find(entry => entry.name === inputText1);                    // 既に同じ名前のデータがあるか確認

        if(sameNameExist) {
            const existQuestion = sameNameExist.questions.find(q => q.question === currentQuestionText);       //　既存の質問の検索
            if(existQuestion) {                                                                         // 名前も質問も一致するものが存在する場合
                existQuestion.answer = inputText5;
            } else {
                sameNameExist.questions.push({ question:currentQuestionText, answer:inputText5});      // 既にLocalStorageに同じ名前が存在する場合、questionsの中に配列を
            }
        } else {
            const newEntry = {
                name: inputText1,
                questions: [{question: currentQuestionText, answer: inputText5}]
            };
            savedData.push(newEntry);
        }

        localStorage.setItem(storageKey,JSON.stringify(savedData));                                     // LocalStorageの更新

        if(document.getElementById("QuestionTransferButton")) {
            renderAllQuestions();                                                                       // UIに反映
        }

        document.getElementById("InputBox1").value = "";                                                // テキストボックスを全て空に
        document.getElementById("InputBox5").value = "";
    }



    // プロフィール部分の描画(localstorage内データとHTML要素を生成し、合わせて描画)
    function renderAllProfiles() {
        const sections = document.getElementById("profileSections");
        sections.innerHTML = "";
        const savedData = JSON.parse(localStorage.getItem("ProfileData")) || [];                          // JSON形式で書かれた文字列をJavaScriptのJSONオブジェクトに変換する

        savedData.forEach(ProfileData => {                                                                              //  <div class="profileSection">
            const div = document.createElement("div");                                                                    //      <p>名前：吉行昭洋</p>                                                  localstorage → profileData → {"name": "吉行昭洋", "hobby": "ゲーム", "favoriteThing": "ゲーム", "favoriteVideo": "youtube"}
            div.className = "profileSection";                                                                           //      <p>趣味、特技：ゲーム</p>
                                                                                                                        //      <p>一番ハマっているもの：ゲーム</p>
            const nameP = document.createElement("p");                                                                    //      <p>好きなテレビ、映画、本、配信サービス等：youtube</p>
            nameP.textContent = "名前：" + ProfileData.name;                                                            //       <button class="delete-button" data-name="吉行昭洋">全て削除</button>
                                                                                                                        //  </div>
            const hobbyP = document.createElement("p");
            hobbyP.textContent = "趣味、特技：" + ProfileData.hobby;

            const favoriteThingP = document.createElement("p");
            favoriteThingP.textContent = "一番ハマっているもの：" + ProfileData.favoriteThing;

            const favoriteVideoP = document.createElement("p");
            favoriteVideoP.textContent = "好きなテレビ、映画、本、配信サービス等：" + ProfileData.favoriteVideo;

            const profileDeleteButton = document.createElement("button");                                            // ボタン要素生成 → テキストとクラスを付与 → data-name="" localStorageのProfileDataオブジェクト内の キー:name に対応する要素を入れる
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

    // 「管理ページ」リンクをクリックした際のパスワード入力関数
    function gate() {
        const UserInput = prompt("パスワードを入力して下さい:","");
        if (UserInput !== null) {
            location.href = UserInput + ".html";                                    // パスワードが入力されたら管理ページへ遷移
        }
    }

    // 指定した名前のプロフィールデータを削除する関数
    function deleteProfile(ProfileData_name) {
        const storageKey = "ProfileData";
        const profileSavedData = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updateProfileData = profileSavedData.filter(profileData => profileData.name !== ProfileData_name);
        localStorage.setItem(storageKey, JSON.stringify(updateProfileData));
        renderAllProfiles()
    }


    // 質問部分の描画 (localstorage内データとHTML要素を生成し、合わせて描画)
    function renderAllQuestions() {
        const sections = document.getElementById("questionSections");
        sections.innerHTML = "";
        const savedData = JSON.parse(localStorage.getItem("questionData")) || [];

        savedData.forEach(questionData => {                                     //  <div class="questionSection">
            const div = document.createElement("div");                            //      <p>名前：</p>
            div.className = "questionSection";                                  //      <p>吉行昭洋</p>                          localstorage → questionData → {name: "吉行昭洋"}
            const p = document.createElement("p");                                //  </div>
            p.textContent = "名前："
            const nameP = document.createElement("p");
            nameP.textContent = questionData.name;
            div.appendChild(p);
            div.appendChild(nameP);
            
            questionData.questions.forEach(q => {                               //  <p>
                const questionP = document.createElement("p");                    //      <span>やってみたい事は？</span>           localstorage → questions → {question: "", answer: ""}
                const questionSpan = document.createElement("span");              //  </p>
                questionSpan.textContent = q.question + ":";                    //  <p>
                questionP.appendChild(questionSpan);                            //      <span>空を飛ぶ</span>
                                                                                //  </p>
                const answerP = document.createElement("p");
                const answerSpan = document.createElement("span");
                answerSpan.textContent = q.answer;
                answerP.appendChild(answerSpan);
                div.appendChild(questionP);                                     //  <div class="questionSection"></div>　に<p>要素を入れる
                div.appendChild(answerP);
            });

            const questionDeleteButton = document.createElement("button");                        // ボタン要素を生成 → テキストとクラス付与 → data-name = "" localstorageのquestionDataオブジェクトのキー：nameを付与
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
        const storageKey = "questionData";
        const questionSavedData = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updateQuestionData = questionSavedData.filter(questionData => questionData.name !== questionData_name);
        localStorage.setItem(storageKey, JSON.stringify(updateQuestionData));
        renderAllQuestions()
    }

    // トップページの処理
    if(document.title === "トップページ") {
        TipsChangeButton.addEventListener("click", (event) => {
            event.preventDefault();
            RenderRandomTips();
        });
        RenderRandomTips();
    }

    // プロフィール共有ページの処理
    if(document.title === "メインページ") {
        TipsChangeButton.addEventListener("click", RenderRandomTips);           // tipsチェンジボタン
        ProfileTransferButton.addEventListener('click', ProfileSave);                     // プロフィールをLocalStorageへ保存 (送信ボタン)
        RenderRandomTips();                                             // ランダムなコミュニケーションのヒント
    };

    // 質問共有ページの処理
    if(document.title === "2択質問ページ") {
        QuestionTransferButton.addEventListener('click', QuestionSave);                     // 質問をLocalStorageへ保存 (送信ボタン)
        QuestionChangeButton.addEventListener('click', RenderRandomQuestion);                   // Questionチェンジボタン
        RenderRandomQuestion();                                                 // ランダム質問の描画
    };

    adminLink.addEventListener("click", gate);                                 // 管理ページへのリンク

    // 空白やスペースを入力できないようにする
    inputElements.forEach(input => {                                        // 各<input>要素に処理を行う
        input.addEventListener("input", (event) => {                            // 各<input>要素にイベントリスナーを追加、入力フィールドに文字を入力するとイベントが発生
            event.target.value = event.target.value.replace(/\s/g, "");     // 入力された文字列の中の空白を削除
        });
    });
}