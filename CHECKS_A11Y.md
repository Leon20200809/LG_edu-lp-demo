
# Accessibility 完全対応チェックリスト（LP用）

## 0. 全体設計
- [ ] HTMLはセマンティック要素（`header/main/nav/section/footer`）で区切られている  
- [ ] 見出し階層：ページ1つだけ`<h1>`、主要セクションは`<h2>`、下層は`<h3>`  
- [ ] ページ先頭に**スキップリンク**（`<a href="#main" class="sr-only-focusable">本文へスキップ</a>`）がある  
- [ ] `lang="ja"` 等の言語属性が`<html>`に設定済み

## 1. ナビゲーション／ハンバーガー
- [ ] `<nav aria-label="メイン">` と**名前付きランドマーク**になっている  
- [ ] ハンバーガー`<button>`は `aria-controls`/`aria-expanded`/`aria-label` を正しく切替  
- [ ] **閉じている間**は `<nav aria-hidden="true" inert>`（フォーカス不能／読上げ対象外）  
- [ ] 開閉時：**フォーカス退避**（閉→ボタンへ）／**初期フォーカス**（開→最初のリンクへ）  
- [ ] 外側クリック、`Esc`（任意）、リンククリックで**確実に閉じられる**

## 2. キーボード操作（Tabのみで完結）
- [ ] すべてのインタラクティブ要素に**Tabで到達**できる  
- [ ] **フォーカスリングを消していない**（`:focus-visible`で見やすい）  
- [ ] モーダル/ドロワーの**フォーカストラップ**（開いてる間は中だけ循環）  
- [ ] キーボードのみで**フォーム送信・CTA押下**が可能

## 3. 画像・アイコン
- [ ] 意味のある画像は**適切な`alt`**（内容が伝わる文）  
- [ ] **飾り画像**は `alt=""`（読み上げ除外）  
- [ ] SVGアイコンは、装飾なら `aria-hidden="true"`、意味があれば`aria-label`や`<title>`で説明

## 4. リンク／ボタンの文言
- [ ] **単独で意味が通る**テキスト（「こちら」「詳しく」は禁止）  
- [ ] 外部リンクは視覚的示唆（アイコン等）と、必要なら`aria-label`で補足  
- [ ] 同一ページ内アンカーは**スムーススクロール**＋**固定ヘッダー補正**あり

## 5. フォーム（資料DL／問い合わせ／登録）
- [ ] すべての入力に**対応する`<label for>`**がある（プレースホルダ代用は不可）  
- [ ] エラーは**テキストで表示**し、`aria-describedby`で入力と紐づけ  
- [ ] 成功／失敗メッセージの領域に `role="status"` か `aria-live="polite"`  
- [ ] 必須入力は `required` とテキストでも明示（＊だけにしない）

## 6. 動画・音声・アニメーション
- [ ] 動画には**字幕**（少なくとも要点のテキスト代替）  
- [ ] 自動再生・音声ありは**原則禁止**（やむを得ない場合は即停止できるUI）  
- [ ] CSS/JSの動きは `@media (prefers-reduced-motion: reduce)` で**軽減**  
- [ ] パララックスや激しい点滅は**避ける**（光過敏配慮）

## 7. コントラスト／色覚
- [ ] 文字と背景の**コントラスト比**：本文4.5:1以上、18pt相当の大文字は3:1以上  
- [ ] 色だけで情報を伝えない（アイコンやテキストで**冗長表現**）  
- [ ] フォーカス状態・ホバー状態は**色以外**の変化も付与（下線・形状）

## 8. レスポンシブ／レイアウト
- [ ] ビューポート設定（`<meta name="viewport"...>`）  
- [ ] 縦・横向きで**機能が欠落しない**  
- [ ] **ズーム（ピンチ）を邪魔しない**（`user-scalable=no` は使わない）

## 9. ライブ更新・動的DOM
- [ ] 通知・件数・結果ログなどは `aria-live="polite"` or `role="status"`  
- [ ] 表示/非表示は **`hidden`/`inert`/`aria-hidden`** を**フォーカス遷移とセット**で制御  
- [ ] 非表示への切替前に**フォーカス退避**（先に隠すな）

## 10. テーブル／リスト（必要な場合）
- [ ] テーブルは**見出しセルに`<th>`**、関連づけ（`scope`または`headers/id`）  
- [ ] データでなければ**リスト（`<ul>/<ol>`）を使う**：箇条書きの意味が伝わる

## 11. SEOと両利き
- [ ] `<title>` と **一意の`<h1>`** が内容を要約  
- [ ] 主要画像に**代替テキスト**（OGP含めて要点が伝わる）  
- [ ] セマンティック構造（検索エンジンの理解に寄与）

## 12. テスト儀式（最終局面）
- [ ] **キーボードのみ**でファーストビューからCTA完了まで通し操作  
- [ ] **スクリーンリーダー試験**  
  - iPhone VoiceOver：設定→アクセシビリティ→VoiceOver（ON）  
  - Windows NVDA（無料） or Narrator（Win+Ctrl+Enter）  
  - 期待：ハンバーガーが「開く/閉じる」と読み、開閉でリンク群が読める  
- [ ] **自動検査**  
  - Chrome拡張 **axe DevTools** で重大エラー0  
  - **Lighthouse → Accessibility 90+**  
- [ ] **コントラスト検査**：WCAG準拠ツール（Deque/TPGi など）でNGなし  
- [ ] **縮小/拡大**（200%）でもレイアウト破綻がない

---

## 実装スニペット（要所）

**ハンバーガー：初期状態**
```html
<nav id="site-nav" class="site-nav" aria-label="メイン" aria-hidden="true" inert>…</nav>
<button class="hamburger"
  aria-controls="site-nav"
  aria-expanded="false"
  aria-label="メニューを開く">…</button>
```

**動的切替（要点のみ）**
```js
function setMenuState(isOpen){
  $hamburger
    .toggleClass('isActive', isOpen)
    .attr('aria-expanded', String(isOpen))
    .attr('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');

  $nav
    .toggleClass('isActive', isOpen)
    .attr('aria-hidden', String(!isOpen));

  if (isOpen){
    $nav.removeAttr('inert');
    requestAnimationFrame(()=> $nav.find('a[href]').first().trigger('focus'));
  } else {
    $hamburger.trigger('focus');
    $nav.attr('inert', '');
  }
}
```

**動きの軽減**
```css
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important; }
}
```

**スクリーンリーダー専用クラス**
```css
.sr-only{ position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
.sr-only-focusable:focus{ position:static; width:auto; height:auto; margin:0; overflow:visible; clip:auto; white-space:normal; }
```
