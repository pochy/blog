# kinacoo.com ブログ

勉強がてら作った個人ブログです。Next.js で構築した Markdown ベースの静的サイトで、GitHub Pages にホストしています。

- **サイト**: [www.kinacoo.com](https://www.kinacoo.com)

## 技術スタック

| 分類           | 技術                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------ |
| フレームワーク | Next.js 16 / React 19                                                                      |
| 言語           | TypeScript                                                                                 |
| スタイル       | Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com/)（Radix UI）                            |
| フォント       | Noto Sans JP（next/font）                                                                  |
| コンテンツ     | Markdown + [gray-matter](https://github.com/jonschlinkert/gray-matter)（frontmatter 解析） |
| パッケージ管理 | pnpm                                                                                       |

## 主な機能

- **記事一覧・ページネーション** — トップで記事リスト、`/articles/page/[page]` でページ送り
- **記事詳細** — `/articles/[...slug]` で `_posts/年/月/日/ファイル名` を URL に対応
- **カテゴリ・タグ** — `/categories/[category]`、`/tags/[tag]` でフィルタ表示
- **Markdown 拡張**
  - GFM、絵文字、目次（TOC）
  - 数式（KaTeX）、Mermaid 図
  - シンタックスハイライト（Prism: TSX, Ruby, Python, Go, CSS, Bash 等）
  - 生 HTML（rehype-sanitize でサニタイズ）
- **RSS / Atom / JSON** — ビルド時に `public/rss/` に生成（`feed` パッケージ）
- **下書き** — frontmatter の `draft: true` は一覧・フィードから除外
- **Front Matter** — VS Code の [Front Matter](https://frontmatter.codes/) で投稿編集

## プロジェクト構成

```
_posts/                 # 記事: _posts/年/月/日/スラッグ.md
public/
  assets/               # 画像
  rss/                  # feed.xml, atom.xml, feed.json（ビルドで生成）
scripts/
  before.ts             # prebuild: RSS 生成を実行
  rss.ts                # RSS / Atom / JSON 生成
src/
  app/                  # App Router
    articles/           # 一覧・ページネーション・詳細
    categories/         # カテゴリ別
    tags/               # タグ別
  components/           # レイアウト・Markdown・Mermaid・UI
  lib/                  # cn 等
  utils/                # posts, categories, tags
  types.ts
```

## 記事の frontmatter

```yaml
title: タイトル
slug: 記事スラッグ          # URL の一部（ファイルパスと整合）
createdAt: 2023-12-11T20:47:47.935
updatedAt: 2023-12-11T20:41:57.852
description: 概要
coverImage: /assets/blog/xxx.png
draft: false
tags: [three.js, memo]
categories: [develop]
author: { name: "", picture: "" }
ogImage: { url: /assets/blog/xxx.png }
```

### 日付のフォーマット

- **タイムゾーン**  
  - **保存**: UTC（frontmatter の `createdAt` / `updatedAt`）
  - **表示**: JST（日本標準時）に変換して表示
- **frontmatter に記述する形式**  
  - `createdAt` / `updatedAt` は ISO 8601 風の `yyyy-MM-dd'T'HH:mm:ss.SSS`（**UTC**）を想定（例: `2023-12-11T20:47:47.935`）。
  - [Front Matter](https://frontmatter.codes/) 拡張では `frontmatter.json` の `frontMatter.taxonomy.dateFormat` に `"yyyy-MM-dd'T'HH:mm:ss.SSS"` を指定してあり、datetime フィールドはこの形式で出力される。
- **画面での表示**  
  - `src/utils/dateUtils.ts` の `formatDate()` で `toLocaleString("ja-JP", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tokyo" })` により、**JST** で `2023年12月11日` のように日本語表示する（時刻は出さない）。

## 開発

### 必要な環境

- Node.js 20
- pnpm 10.x（`package.json` の `packageManager` に記載）

### セットアップと起動

```bash
pnpm install
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 主要スクリプト

| コマンド         | 説明                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`       | 開発サーバー起動                                                               |
| `pnpm build`     | 静的エクスポート（`out/`）。prebuild で RSS 生成                               |
| `pnpm start`     | `next start`（静的エクスポート時は `out` を配信する用途なら `pnpm startprod`） |
| `pnpm startprod` | `serve` で `out` を配信                                                        |
| `pnpm lint`      | ESLint                                                                         |

## ビルド・デプロイ

- **出力**: `output: 'export'` で静的サイトを `out/` に出力
- **画像**: `images.unoptimized: true`（静的ホストのため Image 最適化 API は未使用）
- **ホスティング**: GitHub Pages（`.github/workflows/nextjs.yml`）
  - `main` への push または手動実行でビルド → `out` を GitHub Pages にデプロイ
- **ドメイン**: `CNAME` で `www.kinacoo.com` を指定
- **basePath**: `GITHUB_REPOSITORY` または `NEXT_PUBLIC_BASE_PATH` に応じて設定（カスタムドメインの場合は空を想定）

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel へのデプロイ](https://nextjs.org/docs/deployment)（Vercel を使う場合）
