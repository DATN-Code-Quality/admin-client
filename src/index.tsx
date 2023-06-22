import React from 'react';
import { GlobalDebug } from './utils/removeConsole';

import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/en_US';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import Store from './adapters/redux/store';
import App from './App';
import 'dayjs/locale/vi';
import 'antd-button-color/dist/css/style.less';
import './ui/css/style.less';
import './theme.less';

import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';

dayjs.extend(weekday);
dayjs.extend(localeData);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={Store}>
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
