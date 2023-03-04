const CracoAntDesignPlugin = require("craco-antd");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const WebpackBar = require("webpackbar");

const path = require("path");
const { version } = require("./package.json");
const ASSET_PATH = process.env.REACT_APP_ASSET_PATH;
const IS_PRODUCTION = process.env.REACT_APP_ENV === "production";
const suffix = IS_PRODUCTION ? "" : "dev/";

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, "src/ui/css/style.less"),
      },
    },
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[6].options.filename = `react/admin-client/[name].[contenthash:20].css`;
          webpackConfig.plugins[6].options.chunkFilename = `react/admin-client/[name].[contenthash:20].css`;
          webpackConfig.plugins.push(new AntdDayjsWebpackPlugin());
          return webpackConfig;
        },
      },
      options: {},
    },
  ],

  babel: {
    loaderOptions: (babelLoaderOptions) => {
      if (IS_PRODUCTION) {
        babelLoaderOptions.plugins = [
          ...babelLoaderOptions.plugins,
          // ["transform-remove-console", { exclude: ["error", "warn"] }],
        ];
      }
      return babelLoaderOptions;
    },
  },
  webpack: {
    plugins: [new WebpackBar({ profile: true })],
    configure: {
      devtool: IS_PRODUCTION ? false : undefined,
      output: {
        filename: `react/admin-client/[name].[contenthash:20].js`,
        chunkFilename: `react/admin-client/[name].[contenthash:20].js`,
        publicPath: ASSET_PATH,
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        },
      },
    },
  },
};
