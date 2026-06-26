import { useState, useEffect, useCallback } from "react";

// ===== DATA =====
const hiragana = [
  { char: "あ", romaji: "a" }, { char: "い", romaji: "i" }, { char: "う", romaji: "u" }, { char: "え", romaji: "e" }, { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" }, { char: "き", romaji: "ki" }, { char: "く", romaji: "ku" }, { char: "け", romaji: "ke" }, { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" }, { char: "し", romaji: "shi" }, { char: "す", romaji: "su" }, { char: "せ", romaji: "se" }, { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" }, { char: "ち", romaji: "chi" }, { char: "つ", romaji: "tsu" }, { char: "て", romaji: "te" }, { char: "と", romaji: "to" },
  { char: "な", romaji: "na" }, { char: "に", romaji: "ni" }, { char: "ぬ", romaji: "nu" }, { char: "ね", romaji: "ne" }, { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" }, { char: "ひ", romaji: "hi" }, { char: "ふ", romaji: "fu" }, { char: "へ", romaji: "he" }, { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" }, { char: "み", romaji: "mi" }, { char: "む", romaji: "mu" }, { char: "め", romaji: "me" }, { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" }, { char: "ゆ", romaji: "yu" }, { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" }, { char: "り", romaji: "ri" }, { char: "る", romaji: "ru" }, { char: "れ", romaji: "re" }, { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" }, { char: "を", romaji: "wo" }, { char: "ん", romaji: "n" },
];

const katakana = [
  { char: "ア", romaji: "a" }, { char: "イ", romaji: "i" }, { char: "ウ", romaji: "u" }, { char: "エ", romaji: "e" }, { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" }, { char: "キ", romaji: "ki" }, { char: "ク", romaji: "ku" }, { char: "ケ", romaji: "ke" }, { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" }, { char: "シ", romaji: "shi" }, { char: "ス", romaji: "su" }, { char: "セ", romaji: "se" }, { char: "ソ", romaji: "so" },
  { char: "タ", romaji: "ta" }, { char: "チ", romaji: "chi" }, { char: "ツ", romaji: "tsu" }, { char: "テ", romaji: "te" }, { char: "ト", romaji: "to" },
  { char: "ナ", romaji: "na" }, { char: "ニ", romaji: "ni" }, { char: "ヌ", romaji: "nu" }, { char: "ネ", romaji: "ne" }, { char: "ノ", romaji: "no" },
  { char: "ハ", romaji: "ha" }, { char: "ヒ", romaji: "hi" }, { char: "フ", romaji: "fu" }, { char: "ヘ", romaji: "he" }, { char: "ホ", romaji: "ho" },
  { char: "マ", romaji: "ma" }, { char: "ミ", romaji: "mi" }, { char: "ム", romaji: "mu" }, { char: "メ", romaji: "me" }, { char: "モ", romaji: "mo" },
  { char: "ヤ", romaji: "ya" }, { char: "ユ", romaji: "yu" }, { char: "ヨ", romaji: "yo" },
  { char: "ラ", romaji: "ra" }, { char: "リ", romaji: "ri" }, { char: "ル", romaji: "ru" }, { char: "レ", romaji: "re" }, { char: "ロ", romaji: "ro" },
  { char: "ワ", romaji: "wa" }, { char: "ヲ", romaji: "wo" }, { char: "ン", romaji: "n" },
];

// Reading practice words (hiragana → romaji)
const hiraganaWords = [
  { word: "わたし", romaji: "watashi", meaning: "I / me" },
  { word: "ありがとう", romaji: "arigatou", meaning: "thank you" },
  { word: "おはよう", romaji: "ohayou", meaning: "good morning" },
  { word: "にほん", romaji: "nihon", meaning: "Japan" },
  { word: "たべる", romaji: "taberu", meaning: "to eat" },
  { word: "みず", romaji: "mizu", meaning: "water" },
  { word: "いぬ", romaji: "inu", meaning: "dog" },
  { word: "ねこ", romaji: "neko", meaning: "cat" },
  { word: "さくら", romaji: "sakura", meaning: "cherry blossom" },
  { word: "がっこう", romaji: "gakkou", meaning: "school" },
  { word: "ともだち", romaji: "tomodachi", meaning: "friend" },
  { word: "おかあさん", romaji: "okaasan", meaning: "mother" },
  { word: "でんしゃ", romaji: "densha", meaning: "train" },
  { word: "しごと", romaji: "shigoto", meaning: "work" },
  { word: "やさい", romaji: "yasai", meaning: "vegetable" },
  { word: "くだもの", romaji: "kudamono", meaning: "fruit" },
  { word: "むすこ", romaji: "musuko", meaning: "son" },
  { word: "ほんや", romaji: "hon'ya", meaning: "bookstore" },
  { word: "なまえ", romaji: "namae", meaning: "name" },
  { word: "あした", romaji: "ashita", meaning: "tomorrow" },
  { word: "きのう", romaji: "kinou", meaning: "yesterday" },
  { word: "いま", romaji: "ima", meaning: "now" },
  { word: "ことば", romaji: "kotoba", meaning: "word / language" },
  { word: "そら", romaji: "sora", meaning: "sky" },
  { word: "うみ", romaji: "umi", meaning: "sea" },
  { word: "はな", romaji: "hana", meaning: "flower" },
  { word: "てがみ", romaji: "tegami", meaning: "letter" },
  { word: "かぞく", romaji: "kazoku", meaning: "family" },
  { word: "ひと", romaji: "hito", meaning: "person" },
  { word: "まち", romaji: "machi", meaning: "town" },
  { word: "しろ", romaji: "shiro", meaning: "castle / white" },
  { word: "くに", romaji: "kuni", meaning: "country" },
  { word: "あめ", romaji: "ame", meaning: "rain" },
  { word: "かわ", romaji: "kawa", meaning: "river" },
  { word: "やま", romaji: "yama", meaning: "mountain" },
];

const katakanaWords = [
  { word: "コーヒー", romaji: "koohii", meaning: "coffee" },
  { word: "テレビ", romaji: "terebi", meaning: "TV" },
  { word: "パン", romaji: "pan", meaning: "bread" },
  { word: "アイス", romaji: "aisu", meaning: "ice cream" },
  { word: "ケーキ", romaji: "keeki", meaning: "cake" },
  { word: "ノート", romaji: "nooto", meaning: "notebook" },
  { word: "バス", romaji: "basu", meaning: "bus" },
  { word: "タクシー", romaji: "takushii", meaning: "taxi" },
  { word: "スポーツ", romaji: "supootsu", meaning: "sports" },
  { word: "ゲーム", romaji: "geemu", meaning: "game" },
  { word: "インターネット", romaji: "intaanetto", meaning: "internet" },
  { word: "カメラ", romaji: "kamera", meaning: "camera" },
  { word: "ピアノ", romaji: "piano", meaning: "piano" },
  { word: "レストラン", romaji: "resutoran", meaning: "restaurant" },
  { word: "ホテル", romaji: "hoteru", meaning: "hotel" },
  { word: "スーパー", romaji: "suupaa", meaning: "supermarket" },
  { word: "バナナ", romaji: "banana", meaning: "banana" },
  { word: "トマト", romaji: "tomato", meaning: "tomato" },
  { word: "アイスクリーム", romaji: "aisukuriimu", meaning: "ice cream" },
  { word: "チョコレート", romaji: "chokoreeto", meaning: "chocolate" },
  { word: "コンピューター", romaji: "konpyuutaa", meaning: "computer" },
  { word: "スマートフォン", romaji: "sumaatofon", meaning: "smartphone" },
  { word: "ミュージック", romaji: "myuujikku", meaning: "music" },
  { word: "アニメ", romaji: "anime", meaning: "anime" },
  { word: "マンガ", romaji: "manga", meaning: "manga" },
  { word: "サッカー", romaji: "sakkaa", meaning: "soccer" },
  { word: "テニス", romaji: "tenisu", meaning: "tennis" },
  { word: "プール", romaji: "puuru", meaning: "swimming pool" },
  { word: "エアコン", romaji: "eakon", meaning: "air conditioner" },
  { word: "ドア", romaji: "doa", meaning: "door" },
  { word: "ベッド", romaji: "beddo", meaning: "bed" },
  { word: "テーブル", romaji: "teebu", meaning: "table" },
  { word: "ソファ", romaji: "sofa", meaning: "sofa" },
  { word: "パソコン", romaji: "pasokon", meaning: "personal computer" },
  { word: "ラジオ", romaji: "rajio", meaning: "radio" },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const generateOptions = (correct, pool, count = 4) => {
  const wrong = shuffle(pool.filter(x => x.romaji !== correct.romaji)).slice(0, count - 1);
  return shuffle([correct, ...wrong]);
};

const RANGES = [5, 10, 15, 20, 25, 30, 35, 40, 46];

// ===== STYLES =====
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Inter:wght@300;400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0d0d14;
    color: #e8e6f0;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 10%, #1a0a2e 0%, #0d0d14 60%);
  }

  .header {
    padding: 20px 24px 0;
    text-align: center;
  }

  .logo {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #c084fc, #818cf8, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 0.78rem;
    color: #6b6b8a;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 20px 16px 0;
    flex-wrap: wrap;
  }

  .nav-tab {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #2a2a3e;
    background: transparent;
    color: #6b6b8a;
    font-size: 0.78rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .nav-tab:hover { border-color: #c084fc; color: #c084fc; }
  .nav-tab.active {
    background: linear-gradient(135deg, #c084fc22, #818cf822);
    border-color: #c084fc;
    color: #c084fc;
  }

  .main {
    padding: 20px 16px 40px;
    max-width: 720px;
    margin: 0 auto;
  }

  /* QUIZ MODE */
  .setup-card {
    background: #13131f;
    border: 1px solid #2a2a3e;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
  }

  .setup-title {
    font-size: 0.7rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #6b6b8a;
    margin-bottom: 14px;
  }

  .script-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .script-btn {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #2a2a3e;
    background: transparent;
    color: #6b6b8a;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .script-btn.active {
    background: #1e1a2e;
    border-color: #818cf8;
    color: #818cf8;
  }

  .range-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .range-btn {
    padding: 10px 6px;
    border-radius: 10px;
    border: 1px solid #2a2a3e;
    background: transparent;
    color: #6b6b8a;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .range-btn:hover { border-color: #38bdf8; color: #38bdf8; }
  .range-btn.active {
    background: #0f1f2e;
    border-color: #38bdf8;
    color: #38bdf8;
  }

  .start-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #c084fc, #818cf8);
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;
    transition: opacity 0.2s;
    letter-spacing: 0.5px;
  }

  .start-btn:hover { opacity: 0.85; }
  .start-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* QUIZ ACTIVE */
  .progress-bar-wrap {
    height: 4px;
    background: #2a2a3e;
    border-radius: 4px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #c084fc, #38bdf8);
    border-radius: 4px;
    transition: width 0.3s;
  }

  .score-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 0.8rem;
    color: #6b6b8a;
  }

  .score-badge {
    font-weight: 600;
    color: #c084fc;
  }

  .char-card {
    background: #13131f;
    border: 1px solid #2a2a3e;
    border-radius: 20px;
    padding: 40px 20px;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .char-card::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 160px; height: 160px;
    background: radial-gradient(circle, #c084fc18, transparent 70%);
    pointer-events: none;
  }

  .char-display {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 5rem;
    line-height: 1;
    color: #f0eeff;
  }

  .char-hint {
    font-size: 0.72rem;
    color: #3a3a5a;
    margin-top: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }

  .option-btn {
    padding: 14px 10px;
    border-radius: 12px;
    border: 1px solid #2a2a3e;
    background: #13131f;
    color: #c5c3d8;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
  }

  .option-btn:hover:not(:disabled) { border-color: #818cf8; color: #818cf8; background: #1a1a2e; }
  .option-btn.correct { background: #0f2d1f; border-color: #22c55e; color: #22c55e; }
  .option-btn.wrong { background: #2d0f0f; border-color: #ef4444; color: #ef4444; }

  .feedback {
    text-align: center;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .feedback.correct { background: #0f2d1f; color: #22c55e; border: 1px solid #22c55e44; }
  .feedback.wrong { background: #2d0f0f; color: #ef4444; border: 1px solid #ef444444; }

  .next-btn {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #2a2a3e;
    background: transparent;
    color: #818cf8;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .next-btn:hover { background: #1a1a2e; border-color: #818cf8; }

  /* RESULT */
  .result-card {
    background: #13131f;
    border: 1px solid #2a2a3e;
    border-radius: 20px;
    padding: 32px 24px;
    text-align: center;
  }

  .result-emoji { font-size: 3rem; margin-bottom: 12px; }
  .result-score {
    font-size: 2.4rem;
    font-weight: 700;
    background: linear-gradient(135deg, #c084fc, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .result-label { color: #6b6b8a; font-size: 0.8rem; margin-top: 4px; margin-bottom: 24px; }

  .retry-btn {
    padding: 12px 32px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #c084fc, #818cf8);
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  /* READING MODE */
  .word-card {
    background: #13131f;
    border: 1px solid #2a2a3e;
    border-radius: 20px;
    padding: 36px 24px;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .word-display {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 3rem;
    color: #f0eeff;
    margin-bottom: 6px;
    letter-spacing: 4px;
  }

  .word-meaning {
    font-size: 0.75rem;
    color: #3a3a5a;
    letter-spacing: 1px;
    font-style: italic;
  }

  .word-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 16px;
  }

  .word-option-btn {
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #2a2a3e;
    background: #13131f;
    color: #c5c3d8;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 2px;
    text-align: left;
  }

  .word-option-btn:hover:not(:disabled) { border-color: #818cf8; color: #818cf8; background: #1a1a2e; }
  .word-option-btn.correct { background: #0f2d1f; border-color: #22c55e; color: #22c55e; }
  .word-option-btn.wrong { background: #2d0f0f; border-color: #ef4444; color: #ef4444; }

  .meaning-reveal {
    font-size: 0.8rem;
    color: #818cf8;
    text-align: center;
    margin-bottom: 10px;
    font-style: italic;
  }

  .mode-select-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }

  .mode-card {
    background: #13131f;
    border: 1px solid #2a2a3e;
    border-radius: 14px;
    padding: 20px 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .mode-card:hover { border-color: #c084fc; }
  .mode-card.active { border-color: #c084fc; background: #1a1228; }
  .mode-card-icon { font-size: 1.8rem; margin-bottom: 8px; }
  .mode-card-title { font-size: 0.85rem; font-weight: 600; color: #c5c3d8; }
  .mode-card-desc { font-size: 0.7rem; color: #4a4a6a; margin-top: 4px; }
`;

// ===== COMPONENTS =====
function QuizMode() {
  const [script, setScript] = useState("hiragana");
  const [range, setRange] = useState(null);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const pool = script === "hiragana" ? hiragana : katakana;

  const startQuiz = () => {
    const subset = pool.slice(0, range);
    const qs = shuffle(subset).slice(0, 35).map(item => ({
      question: item,
      options: generateOptions(item, subset.length >= 4 ? subset : pool),
    }));
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt.romaji === questions[current].question.romaji) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  if (!started) {
    return (
      <div>
        <div className="setup-card">
          <div className="setup-title">Script</div>
          <div className="script-toggle">
            <button className={`script-btn${script === "hiragana" ? " active" : ""}`} onClick={() => { setScript("hiragana"); setRange(null); }}>
              ひらがな Hiragana
            </button>
            <button className={`script-btn${script === "katakana" ? " active" : ""}`} onClick={() => { setScript("katakana"); setRange(null); }}>
              カタカナ Katakana
            </button>
          </div>
          <div className="setup-title">Jumlah Huruf</div>
          <div className="range-grid">
            {RANGES.filter(r => r <= pool.length).map(r => (
              <button
                key={r}
                className={`range-btn${range === r ? " active" : ""}`}
                onClick={() => setRange(r)}
              >
                1 – {r}
              </button>
            ))}
          </div>
          <button className="start-btn" disabled={!range} onClick={startQuiz}>
            Mulai Quiz →
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="result-card">
        <div className="result-emoji">{pct >= 80 ? "🎉" : pct >= 50 ? "😊" : "💪"}</div>
        <div className="result-score">{score}/{questions.length}</div>
        <div className="result-label">{pct}% Benar · {script === "hiragana" ? "Hiragana" : "Katakana"} 1–{range}</div>
        <button className="retry-btn" onClick={() => setStarted(false)}>Coba Lagi</button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="score-row">
        <span>{current + 1} / {questions.length}</span>
        <span className="score-badge">✓ {score}</span>
      </div>
      <div className="char-card">
        <div className="char-display">{q.question.char}</div>
        <div className="char-hint">{script === "hiragana" ? "hiragana" : "katakana"} — bacaan romaji?</div>
      </div>
      <div className="options-grid">
        {q.options.map((opt, i) => {
          let cls = "option-btn";
          if (selected) {
            if (opt.romaji === q.question.romaji) cls += " correct";
            else if (selected.romaji === opt.romaji) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelec
