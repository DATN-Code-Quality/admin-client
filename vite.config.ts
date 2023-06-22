import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import fs from 'fs';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { getThemeVariables } from 'antd/dist/theme';
import vitePluginImp from 'vite-plugin-imp';
import lessToJS from 'less-vars-to-js';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './src/theme.less'), 'utf8')
  );
  console.log(themeVariables);
  return defineConfig({
    base: process.env.VITE_ASSET_PATH,
    plugins: [
      reactRefresh(),
      // createStyleImportPlugin({
      //   libs: [
      //     {
      //       libraryName: 'antd',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
          // 重写 less 变量，定制样式
          modifyVars: themeVariables,
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: path.resolve(__dirname, './build'),
    },
  });
};
