---
title: 記事タイトル
createdAt: 2026-06-23T00:00:00.000
updatedAt: 2026-06-23T00:00:00.000
description: "記事一覧やメタ情報に表示する短い説明文を書きます。"
coverImage: null
draft: true
tags:
  - tag-name
categories:
  - category-name
author:
  name: ""
  picture: ""
ogImage:
  url: null
keywords:
  - keyword
slug: post-slug
---

# 記事タイトル

<!--
使い方:

1. 新しい投稿ファイルを作る
   - このファイルを `_posts/YYYY/MM/DD/post-slug.md` にコピーする。
   - 例: `_posts/2026/06/23/my-new-post.md`
   - `post-slug.md` のファイル名と frontmatter の `slug` は同じ値にする。

2. frontmatter を更新する
   - `title`: 記事タイトル。
   - `createdAt`: 初回公開日時。形式は `YYYY-MM-DDTHH:mm:ss.SSS`。
   - `updatedAt`: 最終更新日時。最初は `createdAt` と同じでよい。
   - `description`: 一覧やメタ情報に表示される短い説明文。
   - `tags`: タグ一覧ページとタグ別一覧ページに使われる。
   - `categories`: カテゴリ一覧ページとカテゴリ別一覧ページに使われる。
   - `keywords`: 検索やメタ情報向けのキーワード。

3. 画像を設定する
   - カバー画像を使う場合は、画像を `public/assets/blog/` に置く。
   - `coverImage` と `ogImage.url` に `/assets/blog/example.png` のようなパスを入れる。
   - カバー画像を使わない場合は `coverImage: null` と `ogImage.url: null` のままでよい。

4. 本文を書く
   - `# 記事タイトル` は frontmatter の `title` と揃える。
   - 見出しは `##` から使う。
   - コードブロック、リスト、画像、リンクは通常の Markdown で書ける。

5. 一覧へ反映する
   - 公開する記事は `draft: false` に変更する。
   - `draft: true` の記事はトップの記事一覧、タグ一覧、カテゴリ一覧、静的生成ルートから除外される。
   - トップの記事一覧は `createdAt` の新しい順に表示される。
   - `tags` を追加すると `/tags` と `/tags/<tag>` に反映される。
   - `categories` を追加すると `/categories` と `/categories/<category>` に反映される。
   - 同じ `slug` の記事が複数ある場合は、最初に見つかった記事だけが使われるため重複させない。

6. 確認する
   - 開発中は `pnpm dev` を起動してブラウザで確認する。
   - 公開前に `pnpm build` を実行して、記事一覧・タグ一覧・カテゴリ一覧・記事詳細の静的生成を確認する。
   - `pnpm build` は RSS ファイルを再生成するため、意図した差分か確認してからコミットする。
-->

導入文を書く。

## 背景

なぜこの記事を書くのか、前提や状況を書く。

## やったこと

- やったこと 1
- やったこと 2
- やったこと 3

## 詳細

本文を書く。

```bash
# 必要ならコマンド例を書く
```

## まとめ

この記事で分かったこと、次にやることを書く。
