/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // GitHub Pages用のbasePath設定
  // リポジトリ名がURLに含まれる場合（例: username.github.io/repository-name）
  // GITHUB_REPOSITORY環境変数から自動的に取得
  // カスタムドメインを使用している場合は、NEXT_PUBLIC_BASE_PATH環境変数を空に設定
  basePath: process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
      : '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
      : '',
  turbopack: {
    rules: {
      // Markdown を文字列として読み込む例
      '*.md': {
        loaders: [
          {
            loader: 'raw-loader',
            options: {},
          }
        ],
        // `as` を指定して読み込まれるモジュールの拡張子を変えたい場合
        as: '*.js',
      },
      '*.markdown': {
        loaders: [
          {
            loader: 'raw-loader',
            options: {},
          }
        ],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
