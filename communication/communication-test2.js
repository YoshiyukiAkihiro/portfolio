document.addEventListener("DOMContentLoaded", () => {
    // ページ読み込み後に質問とプロフィールを描画
    if (document.getElementById("questionSections")) {
        renderAllQuestions();
    }

    if (document.getElementById("profileSections")) {
        renderAllProfiles();
    }

    // MicroModalの初期化
    MicroModal.init({
        disableScroll: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
    });

    // 質問とヒントの配列
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

    // HTML要素の取得
    const elements = {
        tipsChangeButton: document.querySelector('#TipsChangeButton'),
        questionChangeButton: document.querySelector('#QuestionChangeButton'),
        profileTransferButton: document.getElementById("ProfileTransferButton"),
        questionTransferButton: document.getElementById("QuestionTransferButton"),
        randomQuestion: document.getElementById("randomquestion"),
        randomTips: document.getElementById("randomtips")
    };

    // 各ボタンにイベントリスナーを追加
    if (elements.tipsChangeButton) {
        elements.tipsChangeButton.addEventListener("click", () => renderRandomElement(tips, elements.randomTips));
    }

    if (elements.questionChangeButton) {
        elements.questionChangeButton.addEventListener('click', () => renderRandomElement(questions, elements.randomQuestion));
    }

    if (elements.profileTransferButton) {
        elements.profileTransferButton.addEventListener('click', profileSave);
    }

    if (elements.questionTransferButton) {
        elements.questionTransferButton.addEventListener('click', questionSave);
    }

    // ページ読み込み時にランダムな質問とヒントを表示
    if (elements.randomQuestion) {
        renderRandomElement(questions, elements.randomQuestion);
    }

    if (elements.randomTips) {
        renderRandomElement(tips, elements.randomTips);
    }
});

// ランダムな要素を描画する関数
function renderRandomElement(array, element) {
    const randomIndex = Math.floor(Math.random() * array.length);
    element.textContent = array[randomIndex];
}

// プロフィールを保存する関数
function profileSave() {
    const inputText1 = document.getElementById("InputBox1").value;
    const storageKey = "ProfileData";
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];

    const newEntry = {
        name: inputText1,
        hobby: document.getElementById("InputBox2").value,
        favoriteThing: document.getElementById("InputBox3").value,
        favoriteVideo: document.getElementById("InputBox4").value
    };

    // 同じ名前のデータが存在する場合は更新、存在しない場合は追加
    const updatedData = savedData.filter(entry => entry.name !== inputText1);
    updatedData.push(newEntry);

    localStorage.setItem(storageKey, JSON.stringify(updatedData));
    renderAllProfiles();
    clearInputFields(["InputBox1", "InputBox2", "InputBox3", "InputBox4"]);
}

// 質問を保存する関数
function questionSave() {
    const inputText1 = document.getElementById("InputBox1").value;
    const inputText5 = document.getElementById("InputBox5").value;
    const currentQuestionText = document.getElementById("randomquestion").textContent;

    const storageKey = "questionData";
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];

    const sameNameExist = savedData.find(entry => entry.name === inputText1);

    if (sameNameExist) {
        const existQuestion = sameNameExist.questions.find(q => q.question === currentQuestionText);
        if (existQuestion) {
            existQuestion.answer = inputText5;
        } else {
            sameNameExist.questions.push({ question: currentQuestionText, answer: inputText5 });
        }
    } else {
        const newEntry = {
            name: inputText1,
            questions: [{ question: currentQuestionText, answer: inputText5 }]
        };
        savedData.push(newEntry);
    }

    localStorage.setItem(storageKey, JSON.stringify(savedData));
    renderAllQuestions();
    clearInputFields(["InputBox1", "InputBox5"]);
}

// プロフィールを描画する関数
function renderAllProfiles() {
    const sections = document.getElementById("profileSections");
    sections.innerHTML = "";
    const savedData = JSON.parse(localStorage.getItem("ProfileData")) || [];

    savedData.forEach(profileData => {
        const div = createProfileDiv(profileData);
        sections.appendChild(div);
    });
}

// プロフィールのdiv要素を作成する関数
function createProfileDiv(profileData) {
    const div = document.createElement("div");
    div.className = "profileSection";

    const nameP = createElementWithText("p", `名前：${profileData.name}`);
    const hobbyP = createElementWithText("p", `趣味、特技：${profileData.hobby}`);
    const favoriteThingP = createElementWithText("p", `一番ハマっているもの：${profileData.favoriteThing}`);
    const favoriteVideoP = createElementWithText("p", `好きな動画(テレビ、ネット、サブスク、映画等)：${profileData.favoriteVideo}`);

    div.append(nameP, hobbyP, favoriteThingP, favoriteVideoP);

    if (document.title === "管理ページ") {
        const profileDeleteButton = createDeleteButton(profileData.name, deleteProfile);
        div.appendChild(profileDeleteButton);
    }

    return div;
}

// 質問を描画する関数
function renderAllQuestions() {
    const sections = document.getElementById("questionSections");
    sections.innerHTML = "";
    const savedData = JSON.parse(localStorage.getItem("questionData")) || [];

    savedData.forEach(questionData => {
        const div = createQuestionDiv(questionData);
        sections.appendChild(div);
    });
}

// 質問のdiv要素を作成する関数
function createQuestionDiv(questionData) {
    const div = document.createElement("div");
    div.className = "questionSection";

    const nameP = createElementWithText("p", "名前：");
    const nameValueP = createElementWithText("p", questionData.name);
    div.append(nameP, nameValueP);

    questionData.questions.forEach(q => {
        const questionP = createElementWithText("p", `${q.question}:`);
        const answerP = createElementWithText("p", q.answer);
        div.append(questionP, answerP);
    });

    if (document.title === "管理ページ") {
        const questionDeleteButton = createDeleteButton(questionData.name, deleteQuestion);
        div.appendChild(questionDeleteButton);
    }

    return div;
}

// テキストを設定した要素を作成する関数
function createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

// 削除ボタンを作成する関数
function createDeleteButton(name, deleteFunction) {
    const button = document.createElement("button");
    button.textContent = "全て削除";
    button.className = "delete-button";
    button.setAttribute("data-name", name);
    button.addEventListener("click", () => deleteFunction(name));
    return button;
}

// プロフィールを削除する関数
function deleteProfile(name) {
    const storageKey = "ProfileData";
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedData = savedData.filter(profileData => profileData.name !== name);
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
    renderAllProfiles();
}

// 質問を削除する関数
function deleteQuestion(name) {
    const storageKey = "questionData";
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedData = savedData.filter(questionData => questionData.name !== name);
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
    renderAllQuestions();
}

// 入力フィールドをクリアする関数
function clearInputFields(ids) {
    ids.forEach(id => {
        document.getElementById(id).value = "";
    });
}