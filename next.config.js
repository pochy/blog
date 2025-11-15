/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
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
