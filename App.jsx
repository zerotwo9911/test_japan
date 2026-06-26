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
// ===== BAGIAN 8 - KATA SIFAT =====
{ word: "おおきい", romaji: "ookii", meaning: "besar" },
{ word: "ちいさい", romaji: "chiisai", meaning: "kecil" },
{ word: "たかい", romaji: "takai", meaning: "tinggi / mahal" },
{ word: "ひくい", romaji: "hikui", meaning: "rendah" },
{ word: "やすい", romaji: "yasui", meaning: "murah" },
{ word: "あたらしい", romaji: "atarashii", meaning: "baru" },
{ word: "ふるい", romaji: "furui", meaning: "lama / tua (benda)" },
{ word: "ながい", romaji: "nagai", meaning: "panjang" },
{ word: "みじかい", romaji: "mijikai", meaning: "pendek" },
{ word: "おもい", romaji: "omoi", meaning: "berat" },
{ word: "かるい", romaji: "karui", meaning: "ringan" },
{ word: "あつい", romaji: "atsui", meaning: "panas" },
{ word: "さむい", romaji: "samui", meaning: "dingin" },
{ word: "つめたい", romaji: "tsumetai", meaning: "dingin (benda)" },
{ word: "あかるい", romaji: "akarui", meaning: "terang" },
{ word: "くらい", romaji: "kurai", meaning: "gelap" },
{ word: "はやい", romaji: "hayai", meaning: "cepat" },
{ word: "おそい", romaji: "osoi", meaning: "lambat" },
{ word: "おいしい", romaji: "oishii", meaning: "enak" },
{ word: "まずい", romaji: "mazui", meaning: "tidak enak" },
{ word: "あまい", romaji: "amai", meaning: "manis" },
{ word: "からい", romaji: "karai", meaning: "pedas" },
{ word: "すっぱい", romaji: "suppai", meaning: "asam" },
{ word: "しおからい", romaji: "shiokarai", meaning: "asin" },
{ word: "にがい", romaji: "nigai", meaning: "pahit" },
{ word: "いそがしい", romaji: "isogashii", meaning: "sibuk" },
{ word: "ひま", romaji: "hima", meaning: "luang" },
{ word: "げんき", romaji: "genki", meaning: "sehat / semangat" },
{ word: "しずか", romaji: "shizuka", meaning: "tenang" },
{ word: "にぎやか", romaji: "nigiyaka", meaning: "ramai" },
{ word: "きれい", romaji: "kirei", meaning: "indah / bersih" },
{ word: "ゆうめい", romaji: "yuumei", meaning: "terkenal" },
{ word: "べんり", romaji: "benri", meaning: "praktis" },
{ word: "ふべん", romaji: "fuben", meaning: "tidak praktis" },
{ word: "たいへん", romaji: "taihen", meaning: "sulit / berat" },
{ word: "かんたん", romaji: "kantan", meaning: "mudah" },
{ word: "おもしろい", romaji: "omoshiroi", meaning: "menarik" },
{ word: "つまらない", romaji: "tsumaranai", meaning: "membosankan" },
{ word: "こわい", romaji: "kowai", meaning: "menakutkan" },
{ word: "うれしい", romaji: "ureshii", meaning: "senang" },
{ word: "かなしい", romaji: "kanashii", meaning: "sedih" },
{ word: "たのしい", romaji: "tanoshii", meaning: "menyenangkan" },
{ word: "むずかしい", romaji: "muzukashii", meaning: "sulit" },
{ word: "やさしい", romaji: "yasashii", meaning: "baik hati" },
{ word: "つよい", romaji: "tsuyoi", meaning: "kuat" },
{ word: "よわい", romaji: "yowai", meaning: "lemah" },
{ word: "あぶない", romaji: "abunai", meaning: "berbahaya" },
{ word: "あんぜん", romaji: "anzen", meaning: "aman" },
{ word: "ひろい", romaji: "hiroi", meaning: "luas" },
{ word: "せまい", romaji: "semai", meaning: "sempit" },

// ===== BAGIAN 10 - TEMPAT & TRANSPORTASI =====
{ word: "がっこう", romaji: "gakkou", meaning: "sekolah" },
{ word: "びょういん", romaji: "byouin", meaning: "rumah sakit" },
{ word: "えき", romaji: "eki", meaning: "stasiun" },
{ word: "ぎんこう", romaji: "ginkou", meaning: "bank" },
{ word: "ゆうびんきょく", romaji: "yuubinkyoku", meaning: "kantor pos" },
{ word: "こうえん", romaji: "kouen", meaning: "taman" },
{ word: "デパート", romaji: "depaato", meaning: "toserba" },
{ word: "スーパー", romaji: "suupaa", meaning: "supermarket" },
{ word: "コンビニ", romaji: "konbini", meaning: "minimarket" },
{ word: "レストラン", romaji: "resutoran", meaning: "restoran" },
{ word: "ホテル", romaji: "hoteru", meaning: "hotel" },
{ word: "ほんや", romaji: "honya", meaning: "toko buku" },
{ word: "にくや", romaji: "nikuya", meaning: "toko daging" },
{ word: "さかなや", romaji: "sakanaya", meaning: "toko ikan" },
{ word: "くるま", romaji: "kuruma", meaning: "mobil" },
{ word: "じてんしゃ", romaji: "jitensha", meaning: "sepeda" },
{ word: "でんしゃ", romaji: "densha", meaning: "kereta" },
{ word: "バス", romaji: "basu", meaning: "bus" },
{ word: "タクシー", romaji: "takushii", meaning: "taksi" },
{ word: "ひこうき", romaji: "hikouki", meaning: "pesawat" },
{ word: "ふね", romaji: "fune", meaning: "kapal" },
{ word: "みち", romaji: "michi", meaning: "jalan" },
{ word: "はし", romaji: "hashi", meaning: "jembatan" },
{ word: "やま", romaji: "yama", meaning: "gunung" },
{ word: "かわ", romaji: "kawa", meaning: "sungai" },
{ word: "うみ", romaji: "umi", meaning: "laut" },
{ word: "そら", romaji: "sora", meaning: "langit" },
{ word: "まち", romaji: "machi", meaning: "kota" },
{ word: "むら", romaji: "mura", meaning: "desa" },
{ word: "くに", romaji: "kuni", meaning: "negara" },
{ word: "にほん", romaji: "nihon", meaning: "Jepang" },
{ word: "インドネシア", romaji: "indoneshia", meaning: "Indonesia" },
{ word: "へや", romaji: "heya", meaning: "kamar" },
{ word: "いえ", romaji: "ie", meaning: "rumah" },
{ word: "みせ", romaji: "mise", meaning: "toko" },
{ word: "としょかん", romaji: "toshokan", meaning: "perpustakaan" },
{ word: "びじゅつかん", romaji: "bijutsukan", meaning: "museum seni" },
{ word: "どうぶつえん", romaji: "doubutsuen", meaning: "kebun binatang" },
{ word: "すいぞくかん", romaji: "suizokukan", meaning: "akuarium" },
{ word: "くうこう", romaji: "kuukou", meaning: "bandara" },
{ word: "こうばん", romaji: "kouban", meaning: "pos polisi" },
{ word: "けいさつ", romaji: "keisatsu", meaning: "polisi" },
{ word: "しょうぼうしょ", romaji: "shoubousho", meaning: "kantor pemadam" },
{ word: "じんじゃ", romaji: "jinja", meaning: "kuil Shinto" },
{ word: "おてら", romaji: "otera", meaning: "kuil Buddha" },
{ word: "りょかん", romaji: "ryokan", meaning: "penginapan Jepang" },
{ word: "かいしゃ", romaji: "kaisha", meaning: "perusahaan" },
{ word: "こうじょう", romaji: "koujou", meaning: "pabrik" },
{ word: "しやくしょ", romaji: "shiyakusho", meaning: "kantor wali kota" },
{ word: "ひろば", romaji: "hiroba", meaning: "lapangan / alun-alun" }
  // ===== BAGIAN 6 & 7 - HEWAN + KATA KERJA =====
{ word: "いぬ", romaji: "inu", meaning: "anjing" },
{ word: "ねこ", romaji: "neko", meaning: "kucing" },
{ word: "とり", romaji: "tori", meaning: "burung" },
{ word: "さかな", romaji: "sakana", meaning: "ikan" },
{ word: "うま", romaji: "uma", meaning: "kuda" },
{ word: "うし", romaji: "ushi", meaning: "sapi" },
{ word: "ぶた", romaji: "buta", meaning: "babi" },
{ word: "ひつじ", romaji: "hitsuji", meaning: "domba" },
{ word: "やぎ", romaji: "yagi", meaning: "kambing" },
{ word: "にわとり", romaji: "niwatori", meaning: "ayam" },
{ word: "あひる", romaji: "ahiru", meaning: "bebek" },
{ word: "うさぎ", romaji: "usagi", meaning: "kelinci" },
{ word: "さる", romaji: "saru", meaning: "monyet" },
{ word: "ぞう", romaji: "zou", meaning: "gajah" },
{ word: "きりん", romaji: "kirin", meaning: "jerapah" },
{ word: "とら", romaji: "tora", meaning: "harimau" },
{ word: "ライオン", romaji: "raion", meaning: "singa" },
{ word: "くま", romaji: "kuma", meaning: "beruang" },
{ word: "おおかみ", romaji: "ookami", meaning: "serigala" },
{ word: "きつね", romaji: "kitsune", meaning: "rubah" },
{ word: "しか", romaji: "shika", meaning: "rusa" },
{ word: "かえる", romaji: "kaeru", meaning: "katak" },
{ word: "へび", romaji: "hebi", meaning: "ular" },
{ word: "かめ", romaji: "kame", meaning: "kura-kura" },
{ word: "かに", romaji: "kani", meaning: "kepiting" },
{ word: "えび", romaji: "ebi", meaning: "udang" },
{ word: "たこ", romaji: "tako", meaning: "gurita" },
{ word: "いるか", romaji: "iruka", meaning: "lumba-lumba" },
{ word: "くじら", romaji: "kujira", meaning: "paus" },
{ word: "わに", romaji: "wani", meaning: "buaya" },

{ word: "いく", romaji: "iku", meaning: "pergi" },
{ word: "くる", romaji: "kuru", meaning: "datang" },
{ word: "かえる", romaji: "kaeru", meaning: "pulang" },
{ word: "たべる", romaji: "taberu", meaning: "makan" },
{ word: "のむ", romaji: "nomu", meaning: "minum" },
{ word: "みる", romaji: "miru", meaning: "melihat" },
{ word: "きく", romaji: "kiku", meaning: "mendengar" },
{ word: "よむ", romaji: "yomu", meaning: "membaca" },
{ word: "かく", romaji: "kaku", meaning: "menulis" },
{ word: "はなす", romaji: "hanasu", meaning: "berbicara" },
{ word: "いう", romaji: "iu", meaning: "mengatakan" },
{ word: "あう", romaji: "au", meaning: "bertemu" },
{ word: "まつ", romaji: "matsu", meaning: "menunggu" },
{ word: "ねる", romaji: "neru", meaning: "tidur" },
{ word: "おきる", romaji: "okiru", meaning: "bangun tidur" },
{ word: "あるく", romaji: "aruku", meaning: "berjalan" },
{ word: "はしる", romaji: "hashiru", meaning: "berlari" },
{ word: "すわる", romaji: "suwaru", meaning: "duduk" },
{ word: "たつ", romaji: "tatsu", meaning: "berdiri" },
{ word: "はたらく", romaji: "hataraku", meaning: "bekerja" },
{ word: "べんきょうする", romaji: "benkyousuru", meaning: "belajar" },
{ word: "あそぶ", romaji: "asobu", meaning: "bermain" },
{ word: "かう", romaji: "kau", meaning: "membeli" },
{ word: "うる", romaji: "uru", meaning: "menjual" },
{ word: "つくる", romaji: "tsukuru", meaning: "membuat" },
{ word: "つかう", romaji: "tsukau", meaning: "menggunakan" },
{ word: "もつ", romaji: "motsu", meaning: "membawa / memiliki" },
{ word: "あける", romaji: "akeru", meaning: "membuka" },
{ word: "しめる", romaji: "shimeru", meaning: "menutup" },
{ word: "あらう", romaji: "arau", meaning: "mencuci" },
{ word: "およぐ", romaji: "oyogu", meaning: "berenang" },
{ word: "のぼる", romaji: "noboru", meaning: "naik" },
{ word: "おりる", romaji: "oriru", meaning: "turun" },
{ word: "しぬ", romaji: "shinu", meaning: "meninggal" },
{ word: "うまれる", romaji: "umareru", meaning: "lahir" },
{ word: "わかる", romaji: "wakaru", meaning: "mengerti" },
{ word: "おぼえる", romaji: "oboeru", meaning: "mengingat" },
{ word: "わすれる", romaji: "wasureru", meaning: "lupa" },
{ word: "ならう", romaji: "narau", meaning: "belajar dari seseorang" },
{ word: "おしえる", romaji: "oshieru", meaning: "mengajar / memberi tahu" },
{ word: "てつだう", romaji: "tetsudau", meaning: "membantu" },
{ word: "りょうりする", romaji: "ryourisuru", meaning: "memasak" },
{ word: "そうじする", romaji: "soujisuru", meaning: "membersihkan" },
{ word: "せんたくする", romaji: "sentakusuru", meaning: "mencuci pakaian" },
{ word: "れんしゅうする", romaji: "renshuusuru", meaning: "berlatih" },
{ word: "うたう", romaji: "utau", meaning: "bernyanyi" },
{ word: "おどる", romaji: "odoru", meaning: "menari" },
{ word: "しゃしんをとる", romaji: "shashinwotoru", meaning: "memotret" },
{ word: "でんわする", romaji: "denwasuru", meaning: "menelepon" },
{ word: "りょこうする", romaji: "ryokousuru", meaning: "bepergian" }
  // ===== BAGIAN 5 - MAKANAN & MINUMAN =====
  { word: "ごはん", romaji: "gohan", meaning: "nasi / makanan" },
  { word: "あさごはん", romaji: "asagohan", meaning: "sarapan" },
  { word: "ひるごはん", romaji: "hirugohan", meaning: "makan siang" },
  { word: "ばんごはん", romaji: "bangohan", meaning: "makan malam" },
  { word: "パン", romaji: "pan", meaning: "roti" },
  { word: "みず", romaji: "mizu", meaning: "air" },
  { word: "おちゃ", romaji: "ocha", meaning: "teh hijau" },
  { word: "こうちゃ", romaji: "koucha", meaning: "teh" },
  { word: "コーヒー", romaji: "koohii", meaning: "kopi" },
  { word: "ぎゅうにゅう", romaji: "gyuunyuu", meaning: "susu" },
  { word: "ジュース", romaji: "juusu", meaning: "jus" },
  { word: "さけ", romaji: "sake", meaning: "minuman beralkohol" },
  { word: "ビール", romaji: "biiru", meaning: "bir" },
  { word: "たまご", romaji: "tamago", meaning: "telur" },
  { word: "にく", romaji: "niku", meaning: "daging" },
  { word: "ぎゅうにく", romaji: "gyuuniku", meaning: "daging sapi" },
  { word: "ぶたにく", romaji: "butaniku", meaning: "daging babi" },
  { word: "とりにく", romaji: "toriniku", meaning: "daging ayam" },
  { word: "さかな", romaji: "sakana", meaning: "ikan" },
  { word: "やさい", romaji: "yasai", meaning: "sayuran" },
  { word: "くだもの", romaji: "kudamono", meaning: "buah-buahan" },
  { word: "りんご", romaji: "ringo", meaning: "apel" },
  { word: "みかん", romaji: "mikan", meaning: "jeruk" },
  { word: "バナナ", romaji: "banana", meaning: "pisang" },
  { word: "いちご", romaji: "ichigo", meaning: "stroberi" },
  { word: "ぶどう", romaji: "budou", meaning: "anggur" },
  { word: "トマト", romaji: "tomato", meaning: "tomat" },
  { word: "じゃがいも", romaji: "jagaimo", meaning: "kentang" },
  { word: "たまねぎ", romaji: "tamanegi", meaning: "bawang bombai" },
  { word: "にんじん", romaji: "ninjin", meaning: "wortel" },
  { word: "キャベツ", romaji: "kyabetsu", meaning: "kubis" },
  { word: "レタス", romaji: "retasu", meaning: "selada" },
  { word: "きゅうり", romaji: "kyuuri", meaning: "mentimun" },
  { word: "ラーメン", romaji: "raamen", meaning: "ramen" },
  { word: "うどん", romaji: "udon", meaning: "udon" },
  { word: "そば", romaji: "soba", meaning: "mi soba" },
  { word: "すし", romaji: "sushi", meaning: "sushi" },
  { word: "おにぎり", romaji: "onigiri", meaning: "nasi kepal" },
  { word: "カレー", romaji: "karee", meaning: "kari" },
  { word: "スープ", romaji: "suupu", meaning: "sup" },
  { word: "サラダ", romaji: "sarada", meaning: "salad" },
  { word: "ケーキ", romaji: "keeki", meaning: "kue" },
  { word: "アイス", romaji: "aisu", meaning: "es krim" },
  { word: "チョコレート", romaji: "chokoreeto", meaning: "cokelat" },
  { word: "さとう", romaji: "satou", meaning: "gula" },
  { word: "しお", romaji: "shio", meaning: "garam" },
  { word: "しょうゆ", romaji: "shouyu", meaning: "kecap asin" },
  { word: "みそ", romaji: "miso", meaning: "pasta miso" },
  { word: "いただきます", romaji: "itadakimasu", meaning: "selamat makan (sebelum makan)" },
  { word: "ごちそうさまでした", romaji: "gochisousamadeshita", meaning: "terima kasih atas makanannya" }

  // ===== MAKANAN =====
{ word: "たべもの", romaji: "tabemono", meaning: "Makanan" },
{ word: "ごはん", romaji: "gohan", meaning: "Nasi" },
{ word: "ぱん", romaji: "pan", meaning: "Roti" },
{ word: "おにぎり", romaji: "onigiri", meaning: "Nasi kepal" },
{ word: "すし", romaji: "sushi", meaning: "Sushi" },
{ word: "さしみ", romaji: "sashimi", meaning: "Sashimi" },
{ word: "らーめん", romaji: "raamen", meaning: "Ramen" },
{ word: "うどん", romaji: "udon", meaning: "Udon" },
{ word: "そば", romaji: "soba", meaning: "Mie soba" },
{ word: "やきそば", romaji: "yakisoba", meaning: "Mie goreng Jepang" },
{ word: "てんぷら", romaji: "tenpura", meaning: "Tempura" },
{ word: "たまご", romaji: "tamago", meaning: "Telur" },
{ word: "にく", romaji: "niku", meaning: "Daging" },
{ word: "ぎゅうにく", romaji: "gyuuniku", meaning: "Daging sapi" },
{ word: "ぶたにく", romaji: "butaniku", meaning: "Daging babi" },
{ word: "とりにく", romaji: "toriniku", meaning: "Daging ayam" },
{ word: "さかな", romaji: "sakana", meaning: "Ikan" },
{ word: "えび", romaji: "ebi", meaning: "Udang" },
{ word: "かに", romaji: "kani", meaning: "Kepiting" },
{ word: "いか", romaji: "ika", meaning: "Cumi-cumi" },
{ word: "たこ", romaji: "tako", meaning: "Gurita" },
{ word: "やさい", romaji: "yasai", meaning: "Sayuran" },
{ word: "くだもの", romaji: "kudamono", meaning: "Buah-buahan" },
{ word: "りんご", romaji: "ringo", meaning: "Apel" },
{ word: "みかん", romaji: "mikan", meaning: "Jeruk" },
{ word: "ばなな", romaji: "banana", meaning: "Pisang" },
{ word: "ぶどう", romaji: "budou", meaning: "Anggur" },
{ word: "いちご", romaji: "ichigo", meaning: "Stroberi" },
{ word: "すいか", romaji: "suika", meaning: "Semangka" },
{ word: "もも", romaji: "momo", meaning: "Persik" },
{ word: "なし", romaji: "nashi", meaning: "Pir Jepang" },
{ word: "めろん", romaji: "meron", meaning: "Melon" },
{ word: "れもん", romaji: "remon", meaning: "Lemon" },
{ word: "とまと", romaji: "tomato", meaning: "Tomat" },
{ word: "きゅうり", romaji: "kyuuri", meaning: "Mentimun" },
{ word: "きゃべつ", romaji: "kyabetsu", meaning: "Kubis" },
{ word: "はくさい", romaji: "hakusai", meaning: "Sawi putih" },
{ word: "ねぎ", romaji: "negi", meaning: "Daun bawang" },
{ word: "たまねぎ", romaji: "tamanegi", meaning: "Bawang bombai" },
{ word: "にんじん", romaji: "ninjin", meaning: "Wortel" },
{ word: "じゃがいも", romaji: "jagaimo", meaning: "Kentang" },
{ word: "さつまいも", romaji: "satsumaimo", meaning: "Ubi jalar" },
{ word: "まめ", romaji: "mame", meaning: "Kacang" },
{ word: "とうふ", romaji: "toufu", meaning: "Tahu" },
{ word: "なっとう", romaji: "nattou", meaning: "Natto" },
{ word: "みそ", romaji: "miso", meaning: "Pasta miso" },
{ word: "しお", romaji: "shio", meaning: "Garam" },
{ word: "さとう", romaji: "satou", meaning: "Gula" },
{ word: "こしょう", romaji: "koshou", meaning: "Lada" },
{ word: "しょうゆ", romaji: "shouyu", meaning: "Kecap asin" },

// ===== MINUMAN =====
{ word: "のみもの", romaji: "nomimono", meaning: "Minuman" },
{ word: "みず", romaji: "mizu", meaning: "Air" },
{ word: "おゆ", romaji: "oyu", meaning: "Air panas" },
{ word: "おちゃ", romaji: "ocha", meaning: "Teh" },
{ word: "りょくちゃ", romaji: "ryokucha", meaning: "Teh hijau" },
{ word: "こうちゃ", romaji: "koucha", meaning: "Teh hitam" },
{ word: "ぎゅうにゅう", romaji: "gyuunyuu", meaning: "Susu" },
{ word: "こーひー", romaji: "koohii", meaning: "Kopi" },
{ word: "じゅーす", romaji: "juusu", meaning: "Jus" },
{ word: "おれんじじゅーす", romaji: "orenji juusu", meaning: "Jus jeruk" },
{ word: "りんごじゅーす", romaji: "ringo juusu", meaning: "Jus apel" },
{ word: "こーら", romaji: "koora", meaning: "Minuman cola" },
{ word: "みるく", romaji: "miruku", meaning: "Susu" },
{ word: "さけ", romaji: "sake", meaning: "Minuman sake" },

// ===== RASA =====
{ word: "あまい", romaji: "amai", meaning: "Manis" },
{ word: "からい", romaji: "karai", meaning: "Pedas" },
{ word: "すっぱい", romaji: "suppai", meaning: "Asam" },
{ word: "しょっぱい", romaji: "shoppai", meaning: "Asin" },
{ word: "にがい", romaji: "nigai", meaning: "Pahit" },
{ word: "おいしい", romaji: "oishii", meaning: "Enak" },
{ word: "まずい", romaji: "mazui", meaning: "Tidak enak" },

// ===== MAKAN =====
{ word: "たべる", romaji: "taberu", meaning: "Makan" },
{ word: "のむ", romaji: "nomu", meaning: "Minum" },
{ word: "つくる", romaji: "tsukuru", meaning: "Membuat" },
{ word: "かう", romaji: "kau", meaning: "Membeli" },
{ word: "りょうり", romaji: "ryouri", meaning: "Masakan" },
{ word: "あさごはん", romaji: "asagohan", meaning: "Sarapan" },
{ word: "ひるごはん", romaji: "hirugohan", meaning: "Makan siang" },
{ word: "ばんごはん", romaji: "bangohan", meaning: "Makan malam" },
{ word: "おやつ", romaji: "oyatsu", meaning: "Camilan" },
{ word: "けーき", romaji: "keeki", meaning: "Kue" },
{ word: "あいす", romaji: "aisu", meaning: "Es krim" },
{ word: "ちょこれーと", romaji: "chokoreeto", meaning: "Cokelat" },
{ word: "あめ", romaji: "ame", meaning: "Permen" },
{ word: "びすけっと", romaji: "bisuketto", meaning: "Biskuit" },
{ word: "くっきー", romaji: "kukkii", meaning: "Kue kering" },
{ word: "ちーず", romaji: "chiizu", meaning: "Keju" },
{ word: "ばたー", romaji: "bataa", meaning: "Mentega" },
{ word: "よーぐると", romaji: "yooguruto", meaning: "Yogurt" },
{ word: "はちみつ", romaji: "hachimitsu", meaning: "Madu" },
{ word: "たれ", romaji: "tare", meaning: "Saus" },
{ word: "そーす", romaji: "soosu", meaning: "Saus" },
{ word: "けちゃっぷ", romaji: "kechappu", meaning: "Kecap tomat" },
{ word: "まよねーず", romaji: "mayoneezu", meaning: "Mayones" },
{ word: "べんとう", romaji: "bentou", meaning: "Bekal makan" },
{ word: "しょくどう", romaji: "shokudou", meaning: "Kantin" },
{ word: "れすとらん", romaji: "resutoran", meaning: "Restoran" }
  // ===== SEKOLAH =====
{ word: "がっこう", romaji: "gakkou", meaning: "Sekolah" },
{ word: "きょうしつ", romaji: "kyoushitsu", meaning: "Ruang kelas" },
{ word: "としょかん", romaji: "toshokan", meaning: "Perpustakaan" },
{ word: "じむしょ", romaji: "jimusho", meaning: "Kantor" },
{ word: "べんきょう", romaji: "benkyou", meaning: "Belajar" },
{ word: "しけん", romaji: "shiken", meaning: "Ujian" },
{ word: "しゅくだい", romaji: "shukudai", meaning: "Pekerjaan rumah" },
{ word: "ほん", romaji: "hon", meaning: "Buku" },
{ word: "じしょ", romaji: "jisho", meaning: "Kamus" },
{ word: "ノート", romaji: "nooto", meaning: "Buku catatan" },
{ word: "えんぴつ", romaji: "enpitsu", meaning: "Pensil" },
{ word: "けしごむ", romaji: "keshigomu", meaning: "Penghapus" },
{ word: "ぺん", romaji: "pen", meaning: "Pulpen" },
{ word: "かみ", romaji: "kami", meaning: "Kertas" },
{ word: "つくえ", romaji: "tsukue", meaning: "Meja" },
{ word: "いす", romaji: "isu", meaning: "Kursi" },
{ word: "かばん", romaji: "kaban", meaning: "Tas" },
{ word: "とけい", romaji: "tokei", meaning: "Jam" },
{ word: "でんたく", romaji: "dentaku", meaning: "Kalkulator" },
{ word: "こくばん", romaji: "kokuban", meaning: "Papan tulis" },
{ word: "え", romaji: "e", meaning: "Gambar" },
{ word: "もんだい", romaji: "mondai", meaning: "Soal / Masalah" },
{ word: "こたえ", romaji: "kotae", meaning: "Jawaban" },
{ word: "れんしゅう", romaji: "renshuu", meaning: "Latihan" },
{ word: "にほんご", romaji: "nihongo", meaning: "Bahasa Jepang" },

// ===== RUMAH =====
{ word: "いえ", romaji: "ie", meaning: "Rumah" },
{ word: "へや", romaji: "heya", meaning: "Kamar" },
{ word: "げんかん", romaji: "genkan", meaning: "Pintu masuk" },
{ word: "にわ", romaji: "niwa", meaning: "Halaman" },
{ word: "だいどころ", romaji: "daidokoro", meaning: "Dapur" },
{ word: "ふろ", romaji: "furo", meaning: "Kamar mandi" },
{ word: "トイレ", romaji: "toire", meaning: "Toilet" },
{ word: "まど", romaji: "mado", meaning: "Jendela" },
{ word: "ドア", romaji: "doa", meaning: "Pintu" },
{ word: "ゆか", romaji: "yuka", meaning: "Lantai" },
{ word: "てんじょう", romaji: "tenjou", meaning: "Langit-langit" },
{ word: "かべ", romaji: "kabe", meaning: "Dinding" },
{ word: "でんき", romaji: "denki", meaning: "Listrik / Lampu" },
{ word: "ベッド", romaji: "beddo", meaning: "Tempat tidur" },
{ word: "ふとん", romaji: "futon", meaning: "Kasur Jepang" },
{ word: "まくら", romaji: "makura", meaning: "Bantal" },
{ word: "もうふ", romaji: "moufu", meaning: "Selimut" },
{ word: "テーブル", romaji: "teeburu", meaning: "Meja" },
{ word: "ソファ", romaji: "sofa", meaning: "Sofa" },
{ word: "れいぞうこ", romaji: "reizouko", meaning: "Kulkas" },
{ word: "せんたくき", romaji: "sentakuki", meaning: "Mesin cuci" },
{ word: "でんしレンジ", romaji: "denshi renji", meaning: "Microwave" },
{ word: "エアコン", romaji: "eakon", meaning: "AC" },
{ word: "テレビ", romaji: "terebi", meaning: "Televisi" },
{ word: "でんわ", romaji: "denwa", meaning: "Telepon" },

// ===== BENDA SEHARI-HARI =====
{ word: "みず", romaji: "mizu", meaning: "Air" },
{ word: "おちゃ", romaji: "ocha", meaning: "Teh" },
{ word: "コーヒー", romaji: "koohii", meaning: "Kopi" },
{ word: "コップ", romaji: "koppu", meaning: "Gelas" },
{ word: "さら", romaji: "sara", meaning: "Piring" },
{ word: "はし", romaji: "hashi", meaning: "Sumpit" },
{ word: "スプーン", romaji: "supuun", meaning: "Sendok" },
{ word: "フォーク", romaji: "fooku", meaning: "Garpu" },
{ word: "ナイフ", romaji: "naifu", meaning: "Pisau" },
{ word: "かさ", romaji: "kasa", meaning: "Payung" },
{ word: "くつ", romaji: "kutsu", meaning: "Sepatu" },
{ word: "ぼうし", romaji: "boushi", meaning: "Topi" },
{ word: "ふく", romaji: "fuku", meaning: "Pakaian" },
{ word: "シャツ", romaji: "shatsu", meaning: "Kemeja" },
{ word: "ズボン", romaji: "zubon", meaning: "Celana" },
{ word: "スカート", romaji: "sukaato", meaning: "Rok" },
{ word: "バッグ", romaji: "baggu", meaning: "Tas" },
{ word: "さいふ", romaji: "saifu", meaning: "Dompet" },
{ word: "かぎ", romaji: "kagi", meaning: "Kunci" },
{ word: "めがね", romaji: "megane", meaning: "Kacamata" },
{ word: "くすり", romaji: "kusuri", meaning: "Obat" },
{ word: "ティッシュ", romaji: "tisshu", meaning: "Tisu" },
{ word: "タオル", romaji: "taoru", meaning: "Handuk" },
{ word: "せっけん", romaji: "sekken", meaning: "Sabun" },
{ word: "シャンプー", romaji: "shanpuu", meaning: "Sampo" },
{ word: "はブラシ", romaji: "haburashi", meaning: "Sikat gigi" },
{ word: "かがみ", romaji: "kagami", meaning: "Cermin" },
{ word: "ごみ", romaji: "gomi", meaning: "Sampah" },
{ word: "ふくろ", romaji: "fukuro", meaning: "Kantong" },
{ word: "はこ", romaji: "hako", meaning: "Kotak" },
  // ===== KELUARGA =====
{ word: "かぞく", romaji: "kazoku", meaning: "Keluarga" },
{ word: "ちち", romaji: "chichi", meaning: "Ayah (sendiri)" },
{ word: "はは", romaji: "haha", meaning: "Ibu (sendiri)" },
{ word: "おとうさん", romaji: "otousan", meaning: "Ayah" },
{ word: "おかあさん", romaji: "okaasan", meaning: "Ibu" },
{ word: "りょうしん", romaji: "ryoushin", meaning: "Orang tua" },
{ word: "あに", romaji: "ani", meaning: "Kakak laki-laki (sendiri)" },
{ word: "あね", romaji: "ane", meaning: "Kakak perempuan (sendiri)" },
{ word: "おにいさん", romaji: "oniisan", meaning: "Kakak laki-laki" },
{ word: "おねえさん", romaji: "oneesan", meaning: "Kakak perempuan" },
{ word: "おとうと", romaji: "otouto", meaning: "Adik laki-laki" },
{ word: "いもうと", romaji: "imouto", meaning: "Adik perempuan" },
{ word: "そふ", romaji: "sofu", meaning: "Kakek" },
{ word: "そぼ", romaji: "sobo", meaning: "Nenek" },
{ word: "おじいさん", romaji: "ojiisan", meaning: "Kakek" },
{ word: "おばあさん", romaji: "obaasan", meaning: "Nenek" },
{ word: "おじ", romaji: "oji", meaning: "Paman" },
{ word: "おば", romaji: "oba", meaning: "Bibi" },
{ word: "いとこ", romaji: "itoko", meaning: "Sepupu" },
{ word: "むすこ", romaji: "musuko", meaning: "Anak laki-laki" },
{ word: "むすめ", romaji: "musume", meaning: "Anak perempuan" },
{ word: "こども", romaji: "kodomo", meaning: "Anak" },
{ word: "あかちゃん", romaji: "akachan", meaning: "Bayi" },
{ word: "おっと", romaji: "otto", meaning: "Suami" },
{ word: "つま", romaji: "tsuma", meaning: "Istri" },
{ word: "けっこん", romaji: "kekkon", meaning: "Pernikahan" },

// ===== ORANG =====
{ word: "ひと", romaji: "hito", meaning: "Orang" },
{ word: "ともだち", romaji: "tomodachi", meaning: "Teman" },
{ word: "せんせい", romaji: "sensei", meaning: "Guru" },
{ word: "がくせい", romaji: "gakusei", meaning: "Pelajar" },
{ word: "せいと", romaji: "seito", meaning: "Siswa" },
{ word: "かいしゃいん", romaji: "kaishain", meaning: "Karyawan" },
{ word: "しゃちょう", romaji: "shachou", meaning: "Direktur" },
{ word: "いしゃ", romaji: "isha", meaning: "Dokter" },
{ word: "かんごし", romaji: "kangoshi", meaning: "Perawat" },
{ word: "けいさつ", romaji: "keisatsu", meaning: "Polisi" },
{ word: "しょうぼうし", romaji: "shouboushi", meaning: "Pemadam kebakaran" },
{ word: "うんてんしゅ", romaji: "untenshu", meaning: "Sopir" },
{ word: "りょうりにん", romaji: "ryourinin", meaning: "Koki" },
{ word: "てんいん", romaji: "tenin", meaning: "Pegawai toko" },
{ word: "ぎんこういん", romaji: "ginkouin", meaning: "Pegawai bank" },
{ word: "えんじにあ", romaji: "enjinia", meaning: "Insinyur" },
{ word: "べんごし", romaji: "bengoshi", meaning: "Pengacara" },
{ word: "のうか", romaji: "nouka", meaning: "Petani" },
{ word: "りょこうしゃ", romaji: "ryokousha", meaning: "Wisatawan" },
{ word: "おきゃくさん", romaji: "okyakusan", meaning: "Pelanggan" },
{ word: "みんな", romaji: "minna", meaning: "Semua orang" },
{ word: "だれ", romaji: "dare", meaning: "Siapa" },
{ word: "じぶん", romaji: "jibun", meaning: "Diri sendiri" },
{ word: "ぼく", romaji: "boku", meaning: "Saya (laki-laki)" },
{ word: "わたし", romaji: "watashi", meaning: "Saya" },
{ word: "あなた", romaji: "anata", meaning: "Anda / Kamu" },
{ word: "かれ", romaji: "kare", meaning: "Dia (laki-laki)" },
{ word: "かのじょ", romaji: "kanojo", meaning: "Dia (perempuan)" },
{ word: "みなさん", romaji: "minasan", meaning: "Hadirin / Semua" },
{ word: "せんぱい", romaji: "senpai", meaning: "Senior" },
{ word: "こうはい", romaji: "kouhai", meaning: "Junior" },
{ word: "となりのひと", romaji: "tonari no hito", meaning: "Orang di sebelah" },
{ word: "がいこくじん", romaji: "gaikokujin", meaning: "Orang asing" },
{ word: "にほんじん", romaji: "nihonjin", meaning: "Orang Jepang" },
  // ===== SALAM =====
{ word: "こんにちは", romaji: "konnichiwa", meaning: "Selamat siang" },
{ word: "こんばんは", romaji: "konbanwa", meaning: "Selamat malam" },
{ word: "おはよう", romaji: "ohayou", meaning: "Selamat pagi" },
{ word: "おはようございます", romaji: "ohayou gozaimasu", meaning: "Selamat pagi (sopan)" },
{ word: "ありがとう", romaji: "arigatou", meaning: "Terima kasih" },
{ word: "ありがとうございます", romaji: "arigatou gozaimasu", meaning: "Terima kasih banyak" },
{ word: "どういたしまして", romaji: "douitashimashite", meaning: "Sama-sama" },
{ word: "すみません", romaji: "sumimasen", meaning: "Permisi / Maaf" },
{ word: "ごめんなさい", romaji: "gomennasai", meaning: "Maaf" },
{ word: "さようなら", romaji: "sayounara", meaning: "Selamat tinggal" },
{ word: "じゃあね", romaji: "jaa ne", meaning: "Sampai nanti" },
{ word: "またね", romaji: "mata ne", meaning: "Sampai jumpa" },
{ word: "またあした", romaji: "mata ashita", meaning: "Sampai besok" },
{ word: "はじめまして", romaji: "hajimemashite", meaning: "Senang berkenalan" },
{ word: "よろしく", romaji: "yoroshiku", meaning: "Mohon bantuannya" },
{ word: "よろしくおねがいします", romaji: "yoroshiku onegaishimasu", meaning: "Mohon kerja samanya" },
{ word: "いってきます", romaji: "ittekimasu", meaning: "Saya berangkat" },
{ word: "いってらっしゃい", romaji: "itterasshai", meaning: "Hati-hati di jalan" },
{ word: "ただいま", romaji: "tadaima", meaning: "Saya pulang" },
{ word: "おかえり", romaji: "okaeri", meaning: "Selamat datang kembali" },

// ===== ANGKA =====
{ word: "れい", romaji: "rei", meaning: "Nol" },
{ word: "いち", romaji: "ichi", meaning: "Satu" },
{ word: "に", romaji: "ni", meaning: "Dua" },
{ word: "さん", romaji: "san", meaning: "Tiga" },
{ word: "よん", romaji: "yon", meaning: "Empat" },
{ word: "ご", romaji: "go", meaning: "Lima" },
{ word: "ろく", romaji: "roku", meaning: "Enam" },
{ word: "なな", romaji: "nana", meaning: "Tujuh" },
{ word: "はち", romaji: "hachi", meaning: "Delapan" },
{ word: "きゅう", romaji: "kyuu", meaning: "Sembilan" },
{ word: "じゅう", romaji: "juu", meaning: "Sepuluh" },
{ word: "ひゃく", romaji: "hyaku", meaning: "Seratus" },
{ word: "せん", romaji: "sen", meaning: "Seribu" },
{ word: "まん", romaji: "man", meaning: "Sepuluh ribu" },

// ===== HARI =====
{ word: "げつようび", romaji: "getsuyoubi", meaning: "Senin" },
{ word: "かようび", romaji: "kayoubi", meaning: "Selasa" },
{ word: "すいようび", romaji: "suiyoubi", meaning: "Rabu" },
{ word: "もくようび", romaji: "mokuyoubi", meaning: "Kamis" },
{ word: "きんようび", romaji: "kinyoubi", meaning: "Jumat" },
{ word: "どようび", romaji: "doyoubi", meaning: "Sabtu" },
{ word: "にちようび", romaji: "nichiyoubi", meaning: "Minggu" },

// ===== WAKTU =====
{ word: "きょう", romaji: "kyou", meaning: "Hari ini" },
{ word: "あした", romaji: "ashita", meaning: "Besok" },
{ word: "きのう", romaji: "kinou", meaning: "Kemarin" },
{ word: "あさ", romaji: "asa", meaning: "Pagi" },
{ word: "ひる", romaji: "hiru", meaning: "Siang" },
{ word: "ゆうがた", romaji: "yuugata", meaning: "Sore" },
{ word: "よる", romaji: "yoru", meaning: "Malam" },
{ word: "いま", romaji: "ima", meaning: "Sekarang" },
{ word: "あとで", romaji: "atode", meaning: "Nanti" },
{ word: "まいにち", romaji: "mainichi", meaning: "Setiap hari" },
{ word: "まいしゅう", romaji: "maishuu", meaning: "Setiap minggu" },
{ word: "まいつき", romaji: "maitsuki", meaning: "Setiap bulan" },
{ word: "ことし", romaji: "kotoshi", meaning: "Tahun ini" },
{ word: "らいねん", romaji: "rainen", meaning: "Tahun depan" },
{ word: "きょねん", romaji: "kyonen", meaning: "Tahun lalu" },
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
            <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
              {opt.romaji}
            </button>
          );
        })}
      </div>
      {selected && (
        <>
          <div className={`feedback ${selected.romaji === q.question.romaji ? "correct" : "wrong"}`}>
            {selected.romaji === q.question.romaji ? "✓ Benar!" : `✗ Salah — Jawaban: ${q.question.romaji}`}
          </div>
          <button className="next-btn" onClick={handleNext}>
            {current + 1 < questions.length ? "Soal Berikutnya →" : "Lihat Hasil"}
          </button>
        </>
      )}
    </div>
  );
}

function ReadingMode() {
  const [script, setScript] = useState("hiragana");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const wordPool = script === "hiragana" ? hiraganaWords : katakanaWords;

  const buildOptions = (correct, pool) => {
    const wrong = shuffle(pool.filter(w => w.romaji !== correct.romaji)).slice(0, 4);
    // pick 3–4 wrong options, ensure we always have some
    const wrongSlice = wrong.slice(0, Math.min(4, wrong.length));
    return shuffle([correct, ...wrongSlice]);
  };

  const startQuiz = () => {
    const qs = shuffle(wordPool).slice(0, 35).map(item => ({
      question: item,
      options: buildOptions(item, wordPool),
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
    if (current + 1 >= questions.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  if (!started) {
    return (
      <div>
        <div className="setup-card">
          <div className="setup-title">Pilih Script Kata</div>
          <div className="script-toggle">
            <button className={`script-btn${script === "hiragana" ? " active" : ""}`} onClick={() => setScript("hiragana")}>
              ひらがな Hiragana
            </button>
            <button className={`script-btn${script === "katakana" ? " active" : ""}`} onClick={() => setScript("katakana")}>
              カタカナ Katakana
            </button>
          </div>
          <p style={{ color: "#4a4a6a", fontSize: "0.78rem", marginBottom: 16, lineHeight: 1.6 }}>
            Latihan membaca {wordPool.length} kata bahasa Jepang. Setiap soal tampilkan 3–5 pilihan romaji, pilih yang benar. Total 35 soal.
          </p>
          <button className="start-btn" onClick={startQuiz}>Mulai Latihan Baca →</button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="result-card">
        <div className="result-emoji">{pct >= 80 ? "🌸" : pct >= 50 ? "😊" : "💪"}</div>
        <div className="result-score">{score}/{questions.length}</div>
        <div className="result-label">{pct}% Benar · Latihan Baca {script === "hiragana" ? "Hiragana" : "Katakana"}</div>
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
      <div className="word-card">
        <div className="word-display">{q.question.word}</div>
        <div className="word-meaning">({q.question.meaning})</div>
      </div>
      <p style={{ color: "#4a4a6a", fontSize: "0.74rem", marginBottom: 10, textAlign: "center", letterSpacing: "1px", textTransform: "uppercase" }}>
        Pilih bacaan yang benar
      </p>
      <div className="word-options">
        {q.options.map((opt, i) => {
          let cls = "word-option-btn";
          if (selected) {
            if (opt.romaji === q.question.romaji) cls += " correct";
            else if (selected.romaji === opt.romaji) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
              {opt.romaji}
            </button>
          );
        })}
      </div>
      {selected && (
        <>
          {selected.romaji !== q.question.romaji && (
            <div className="meaning-reveal">Jawaban benar: {q.question.romaji} ({q.question.meaning})</div>
          )}
          <div className={`feedback ${selected.romaji === q.question.romaji ? "correct" : "wrong"}`}>
            {selected.romaji === q.question.romaji ? `✓ Benar! — ${q.question.romaji} = ${q.question.meaning}` : `✗ Salah — Coba lagi!`}
          </div>
          <button className="next-btn" onClick={handleNext}>
            {current + 1 < questions.length ? "Soal Berikutnya →" : "Lihat Hasil"}
          </button>
        </>
      )}
    </div>
  );
}

// ===== APP =====
export default function App() {
  const [mode, setMode] = useState("menu");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="logo">日本語 Quiz</div>
          <div className="subtitle">Hiragana · Katakana · Reading</div>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab${mode === "menu" ? " active" : ""}`} onClick={() => setMode("menu")}>Home</button>
          <button className={`nav-tab${mode === "quiz-char" ? " active" : ""}`} onClick={() => setMode("quiz-char")}>Quiz Huruf</button>
          <button className={`nav-tab${mode === "quiz-read" ? " active" : ""}`} onClick={() => setMode("quiz-read")}>Latihan Baca</button>
        </div>
        <div className="main">
          {mode === "menu" && (
            <div>
              <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
                <div style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#4a4a6a", textTransform: "uppercase", marginBottom: 8 }}>Pilih mode latihan</div>
              </div>
              <div className="mode-select-grid">
                <div className={`mode-card`} onClick={() => setMode("quiz-char")}>
                  <div className="mode-card-icon">あア</div>
                  <div className="mode-card-title">Quiz Huruf</div>
                  <div className="mode-card-desc">Tebak romaji dari hiragana / katakana. Pilih range 1–5 hingga 1–46.</div>
                </div>
                <div className={`mode-card`} onClick={() => setMode("quiz-read")}>
                  <div className="mode-card-icon">📖</div>
                  <div className="mode-card-title">Latihan Baca</div>
                  <div className="mode-card-desc">Baca kata bahasa Jepang, pilih romaji yang benar. 35 soal.</div>
                </div>
              </div>
              <div className="setup-card" style={{ marginTop: 16 }}>
                <div className="setup-title">Cara Main</div>
                <div style={{ color: "#5a5a7a", fontSize: "0.8rem", lineHeight: 1.8 }}>
                  <div>① <b style={{color:"#818cf8"}}>Quiz Huruf</b> — pilih script & range huruf, lalu tebak romaji dari karakter yang muncul.</div>
                  <div style={{marginTop:8}}>② <b style={{color:"#c084fc"}}>Latihan Baca</b> — kata utuh (mis. わたし) ditampilkan, pilih romaji yang tepat dari 3–5 opsi.</div>
                  <div style={{marginTop:8}}>③ Setiap sesi 35 soal, hasil skor ditampilkan di akhir.</div>
                </div>
              </div>
            </div>
          )}
          {mode === "quiz-char" && <QuizMode />}
          {mode === "quiz-read" && <ReadingMode />}
        </div>
      </div>
    </>
  );
}
