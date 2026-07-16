# 呼吸のスイッチ — 吐き切りトレーナー（kokyu-lite-pwa）

元サンプル（`pwa-factory/apps/kokyu-lite-pwa`）を複製し、**2点だけ**改修した配布用 Lite PWA。
骨格・UX・計測タブ・スプラッシュ・installバナー・配色・タブ構造は元サンプルのまま（変更なし）。

## 変更点（この複製先だけ）
1. **ガイドの呼気を漸増→到達後ランダム**
   - 吸気4秒固定 / HOLD 0.8秒維持。呼気だけ可変。
   - CONFIG（`index.html` の Guide 冒頭）：
     `EXHALE_START=6000, EXHALE_STEP=1000, EXHALE_MAX=12000, EXHALE_RAND_MIN=8000, EXHALE_RAND_MAX=14000`
   - サイクルごとに 6秒→1秒ずつ延長→12秒。12秒到達後は毎回 8〜14秒でランダム（`Math.random`）。
   - orb 収縮アニメ時間はその回の呼気msに動的連動。phase表示は「長く、吐いて（N秒）」。
2. **「なぜ効くの？」を⑤の切り分けどおり拡張**（既存A–Dは維持）
   - 言い切り：HRV↑で休息側（Zaccaro 2018 SR / Laborde 2022 メタ）、呼気延長でHRV↑方向（De Couck 2019 RCT）。
   - 推定：呼吸への注意→島皮質→セイリエンスネットワークと「関係すると考えられています」。「鍛える」とは書かない。
   - 仮説（弱いと明記）：慣れ→予測を崩すランダム化の“設計上の考え方”。
   - DOIは `<!-- エビデンスメモ -->` に保持。関連動画2本＋チャンネルは維持。

その他（UXは変えない裏側の担保）：
- 医療caveat 強化（過換気注意 / しびれで中止 / 呼吸器・心疾患・妊娠中・パニック不安の既往は主治医へ / 断定NG）。
- `sw.js` の `CACHE_NAME` を `kokyu-lite-v1.0.0` に設定（activateでの旧キャッシュ削除は元から有り）。
- manifest / icons は元サンプルのまま（GitHub Pages でそのまま動く）。

## 必要な配置
- このディレクトリ一式（`index.html` / `manifest.webmanifest` / `sw.js` / `icons/`）を
  HTTPS 配下（例：GitHub Pages のサブパス）にそのまま置くだけ。相対パス（`./`）構成。
- 追加ビルド・依存なし。バンドラ不要。

## ローカル起動 / 確認
```
cd /Users/miyazakihokuto/FNT-Apps/kokyu-lite-pwa
python3 -m http.server 8791
# ブラウザで http://localhost:8791/
```
確認ポイント：
- ガイド開始→呼気が 6→7→…→12秒と延び、以降ランダム（phaseの秒数表示で確認）。
- 計測タブ・スプラッシュ・installバナー・配色が元のまま。
- DevTools → Application で SW 登録・オフライン再読込・manifest 認識。

## 音声 / 録音について
- 音声ガイドは既存の **SpeechSynthesis（Web Speech API）** のまま。録音音源は使わない。
- ミュートボタン（🔈/🔇）も元サンプルの挙動を維持。

## push
GitHub への実 push はこの工程では行わない（P5 デプロイ担当）。
