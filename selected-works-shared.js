window.MARO_SELECTED_WORKS = (function(){
const WORKS = [
  // ── 2023 ──
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_works_001.webp',
    track: 'Hangover',
    artist: '刀剣男士千子村正蜻蛉切，ミュージカル『刀剣乱舞』刀剣男士',
    date: '2025.04.23',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'ミュージカル『刀剣乱舞』千子村正蜻蛉切双騎出陣〜万の華うつす鏡〜',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_011.webp',
    track: '恋花華',
    artist: 'BMK「NANAKORO! (B盤)」',
    date: '2023.09.20',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / VICL-37704',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_012.webp',
    track: 'Never End',
    artist: 'さとみ(すとぷり)',
    date: '2023.09.13',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-1 / QARF-60151',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_麻倉もも_嫌いになれない。.webp',
    track: '嫌いになれない。',
    artist: '麻倉もも「シュワワ！」',
    date: '2023.08.16',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / SMCL-826',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_014.webp',
    track: 'ありったけのせいいっぱいで',
    artist: 'りじぇね？「ハリパリッ!(TYPE-N)」',
    date: '2023.06.06',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / RGKP-11',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_015.webp',
    track: 'ピューロ学園校歌 (スイーツバージョン)',
    artist: 'サンリオピューロランド公式 Sweets Puroland フレフレ★ピューロ学園',
    date: '2023.01.28',
    credits: [
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'ショー楽曲「We Are ピューロ学園★応援Dan・ce部」M-2',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_016.webp',
    track: 'Welcome to our Kingdom',
    artist: 'Re:Genesis Kingdom Project「雪の王子さま -Wish Upon a Snow-」',
    date: '2023.01.18',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: '通常盤Type-B M-2 / RGKP-008',
  },
  // ── 2022 ──
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_017.webp',
    track: 'わがままパルフェ / 恋心サンドイッチ / ついてきて',
    artist: 'テンシメシ「わがままパルフェ」',
    date: '2022.10.25',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
      { role: 'Mix',  name: '宮川麿' },
    ],
    note: 'TypeABC M-1「わがままパルフェ」作曲・編曲・Mix / TypeA M-3「恋心サンドイッチ」編曲 / TypeB M-3「ついてきて」作曲・編曲 / QARF-60151',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_018.webp',
    track: 'Attention Lies / I',
    artist: 'Knight A - 騎士A -',
    date: '2022.08.03',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-5「Attention Lies」/ M-12「I」/ STPR-1014',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_011.webp',
    track: 'LOVE HOLIC / Popping Lolipop',
    artist: 'ハニースパイスRe.「真夏のDiary」',
    date: '2022.08.03',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
      { role: 'Mix',  name: '宮川麿' },
    ],
    note: 'TypeABC M-2「LOVE HOLIC」/ TypeB M-3「Popping Lolipop」/ POCS-5034',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_019.webp',
    track: 'ドキドキLOVE / テノナルホウヘ / お疲れSUMMERDAYS / キミ依存□シンドローム',
    artist: 'UPローチ「アオゾラ紙飛行機」',
    date: '2022.04.26',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
      { role: 'Mix',  name: '宮川麿' },
    ],
    note: 'TypeA M-3 / TypeB M-2 / TypeC M-2・M-3 / QARF-60098',
  },
  // ── 2021 ──
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_011.webp',
    track: '好きだよSunshine',
    artist: 'イケてるハーツ「SING・LA・BANG・SHOW!」',
    date: '2021.11.29',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / USSW-0322',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_014.webp',
    track: 'ホワイトノイズ / 君を知って / 好きにさせた癖に / ずるいよ、、、/ Bye by me',
    artist: 'あれくん「呼吸」',
    date: '2021.09.29',
    credits: [
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2・M-4・M-5・M-6・M-10 編曲 / UICZ-9188/9',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_020.webp',
    track: 'DAN!GAN!ドリーマー',
    artist: '上月せれな「NEVER END」',
    date: '2021.06.28',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / 『爆丸アーマードアライアンス』第4クールED / YOSO-0019',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_014.webp',
    track: '秘密インシデント',
    artist: '≠ME「超特急 ≠ME行き」',
    date: '2021.04.07',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-8 / NKCD-6947',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'やったれ我が人生',
    artist: '祭nine.',
    date: '2021.03.17',
    credits: [
      { role: '作曲', name: '宮川麿' },
    ],
    note: 'M-1 / フジテレビ系『最高のオバハン 中島ハルコ』主題歌 / UICZ-5154',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_015.webp',
    track: '××テクニック / きゅんですきゅんです',
    artist: 'ころん(すとぷり)「アスター」',
    date: '2021.01.27',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-6・M-7 / STPR-9017',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_portfolio_014.webp',
    track: 'Do Dah Dah',
    artist: 'BOYS AND MEN「ニューチャレンジャー」',
    date: '2021.07.28',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-3 / UICZ-5162',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: '風の街',
    artist: '光永亮太',
    date: '2021.07.28',
    credits: [
      { role: '編曲', name: '宮川麿' },
      { role: 'Mix',  name: '宮川麿' },
    ],
    note: '',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'With You / あと一歩 / あなただけ',
    artist: '三澤紗千香「IAM ME」',
    date: '2020.12.23',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
      { role: 'Mix',  name: '宮川麿' },
    ],
    note: 'M-4「With You」編曲 / M-5「あと一歩」作曲・編曲 / M-6「あなただけ」作曲・編曲・Mix / UICZ-4488',
  },
  // ── 2020 ──
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'Here we go! / 囚われのMirage',
    artist: 'エラバレシ「リップスティックミュージカル」',
    date: '2020.12.23',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'Disk.1 M-10「Here we go!」/ Disk.2 M-8「囚われのMirage」/ FPBD-0602',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: '轟け獅子太鼓',
    artist: '祭nine.「轟け獅子太鼓」パターンA',
    date: '2020.11.25',
    credits: [
      { role: '作曲', name: '宮川麿' },
    ],
    note: 'M-1 / 日本テレビ系「スッキリ」11月テーマソング / 「バズリズム02」11月OPテーマ / UICZ-5144',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: '恋してアビラゼ!',
    artist: '祭nine.「轟け獅子太鼓」パターンD',
    date: '2020.11.25',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / UICZ-5147',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'with you',
    artist: '三澤紗千香「I\'m here/With You」',
    date: '2020.09.30',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / UICZ-9160',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: '君を通して',
    artist: '雨宮天',
    date: '2020.09.27',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-1',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'SHOW BY コンジョー',
    artist: '祭nine.「祭花 -MATSURIBANA-」',
    date: '2020.09.06',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'Shall We Kiss? / ワンダフルスライダー',
    artist: 'キラキラ選抜隊(ボイメンエリア研究生)',
    date: '2020.07.18',
    credits: [
      { role: '作曲', name: '宮川麿' },
    ],
    note: 'M-1「Shall We Kiss?」/ M-3「ワンダフルスライダー」',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'Blind Mind',
    artist: 'MORISAKI WIN「Parade」',
    date: '2020.08.19',
    credits: [
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-4 共編曲 / COCB-54305',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'HEYHEYBONBON',
    artist: '祭nine.「ビビビTANGO」パターンB',
    date: '2020.06.10',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / TECI-738',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'シャニムニ・フロンティア',
    artist: '祭nine.「ビビビTANGO」パターンC',
    date: '2020.06.10',
    credits: [
      { role: '作曲', name: '宮川麿' },
    ],
    note: 'M-2 / TECI-739',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'あと一歩',
    artist: '三澤紗千香「この手は」',
    date: '2020.04.29',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-2 / TBS「王様のブランチ」4月度EDテーマ / UICZ-9149',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: '',
    track: 'トキメキ・シンパシー',
    artist: '麻倉もも「Agapanthus」',
    date: '2020.04.08',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-3 / SMCL-655',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_nme_himitsu.webp',
    track: '秘密インシデント',
    artist: '≠ME「超特急 ≠ME行き」',
    date: '2021.04.07',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-8 / NKCD-6947',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_works_017.webp',
    track: '××テクニック / きゅんですきゅんです',
    artist: 'ころん(すとぷり)「アスター」',
    date: '2021.01.27',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-6・M-7 / STPR-9017',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_works_025.webp',
    track: '君を通して',
    artist: '雨宮天',
    date: '2020.09.27',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-1',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_works_032.webp',
    track: 'トキメキ・シンパシー',
    artist: '麻倉もも「Agapanthus」',
    date: '2020.04.08',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'M-3 / SMCL-655',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_FRUITS ZIPPER_Spotlight.webp',
    track: 'Spotlight',
    artist: '櫻井優衣(FRUITS ZIPPER)',
    date: '2024.09.18',
    credits: [
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'NEW KAWAII / フルーツバスケット / KAWAII LAB.',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_Lienel_じれったいKISS.webp',
    track: 'じれったいKISS',
    artist: 'Lienel',
    date: '2025.01',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'Go Around The World (Special Edition)',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_M!LK_約束.webp',
    track: '約束',
    artist: 'M!LK「王様の牛乳」',
    date: '2017.11.22',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: '王様の牛乳',
  },
  {
    cat: 'jpop', icon: '🎤', jacket: 'images/_hash_works_046.webp',
    track: '直感リプレイス song by 篭手切江',
    artist: 'ミュージカル『刀剣乱舞』刀剣男士',
    date: '2025.12.22',
    credits: [
      { role: '作曲', name: '宮川麿' },
      { role: '編曲', name: '宮川麿' },
    ],
    note: 'ミュージカル『刀剣乱舞』江おんすていじぜっぷつあーりぶうと',
  },
];
const SELECTED_WORK_JACKET_MAP = {
  'images/_hash_portfolio_003.webp': 'images/_hash_portfolio_012.webp',
  'images/_hash_portfolio_006.webp': 'images/_hash_portfolio_015.webp',
  'images/_hash_portfolio_009.webp': 'images/_hash_portfolio_018.webp',
};
return { WORKS, SELECTED_WORK_JACKET_MAP };
})();
