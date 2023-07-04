/* eslint-disable react/react-in-jsx-scope */
import { message } from 'antd';
import TableExport from 'antd-table-export';
import dayjs, { Dayjs } from 'dayjs';

import Is from './is';

import { Role } from '~/constant/enum';
import { MESSAGE } from '~/constant/message';
import ROUTE from '~/constant/routes';
import { List } from '~/constant/type';

export const buildParams = (data?: any) => {
  if (data) {
    const dataEdited = {
      ...data,
    };

    let queryData = {};
    try {
      queryData = Object.fromEntries(
        Object.entries(dataEdited).filter(([_, v]) => v != null && v !== '')
      );
    } catch (err) {
      console.error('Có lỗi xảy ra: ', err);
    }

    return Object.keys(queryData)
      .map((key) =>
        Array.isArray(queryData[key])
          ? `${key}=[${queryData[key]}]`
          : `${key}=${encodeURIComponent(queryData[key])}`
      )
      .join('&');
  }
  return '';
};
export const buildURLWithParam = (url: string, query?: any) => {
  return `${url}?${buildParams(query)}`;
};

export const removeFromArr = (arr: any[], value: any, key: string) => {
  if (Is.empty(arr)) {
    return arr;
  }
  let index;
  if (key) {
    index = arr.findIndex((item) => item[key] === value);
  } else {
    index = arr.indexOf(value);
  }
  if (index < 0) {
    return arr;
  }
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export const findAndReplace = (arr: any[], value: any, key: string) => {
  if (Is.empty(arr)) {
    return arr;
  }
  let index;
  if (key) {
    index = arr.findIndex((item) => item[key] === value[key]);
  }
  if (index < 0) {
    return arr;
  }
  arr[index] = value;
  return [...arr];
};

export const fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

export const insertAt = (arr: any[], item: any, index = 0) => {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
};

// TO DO: rewrite this
export function asyncAction(title = '', actionFn) {
  return Promise.resolve()
    .then(() => actionFn())
    .then((data) => {
      if (data && data.status !== 0) {
        message.error(MESSAGE.ERROR);
        return undefined;
      }
      if (title) {
        message.success(MESSAGE.SUCCESS);
      }
      return data;
    })
    .catch((data) => {
      if (title && data && data.status) {
        message.error(MESSAGE.ERROR);
      } else {
        message.error(MESSAGE.ERROR);
      }
      return Promise.reject(data);
    });
}

export const renderDuration = (
  seconds: string | number,
  hasHour?: boolean,
  isMillisecond?: boolean
) => {
  if (seconds) {
    if (isMillisecond) {
      const date = new Date(Number(seconds)).toISOString();
      if (hasHour) return date.substr(11, 8);
      return date.substr(14, 5);
    }
    const date = new Date(Number(seconds) * 1000).toISOString();
    if (hasHour) return date.substr(11, 8);
    return date.substr(14, 5);
  }
  return 0;
};

export const renderDateTime = (dateTime: number) =>
  dayjs(dateTime).format('DD/MM/YYYY HH:mm A');

export const removeUndefined = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, []);
};

export const removeUndefinedOrNull = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined && obj[key] !== null) _acc[key] = obj[key];
    return _acc;
  }, []);
};

export const dateToUnix = (
  date: undefined | Dayjs | Date | number,
  isConvertToMs = true
) => {
  if (date === 0) {
    return 0;
  }
  if (!date) return undefined;

  if (dayjs.isDayjs(date)) return isConvertToMs ? date.valueOf() : date.unix();

  return isConvertToMs ? dayjs(date).valueOf() : dayjs(date).unix();
};

export const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const compareString = (a, b) => {
  return removeAccents(a) > removeAccents(b) ? 1 : -1;
};

export const selectSearchFn = (input, options) => {
  return options.filter((i) => {
    return removeAccents(i[1].toLowerCase()).includes(
      removeAccents(input.toLowerCase())
    );
  });
};

export const selectSearchOptionFn = (input, option) =>
  removeAccents(option.label.toLowerCase()).indexOf(
    removeAccents(input.toLowerCase())
  ) >= 0;

export function extend(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// function to format number to locale
export const formatNumber = (number, locale = 'vi-VN') => {
  return number.toLocaleString(locale);
};

// function to format date to locale
export const formatDate = (date, locale?: 'vi-VN', format?: string) => {
  return date && dayjs(Number(date)).format(format || 'DD-MM-YYYY HH:mm:ss');
};

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  }

  const match = document.cookie.match(
    RegExp(`(?:^|;\\s*)${escape(name)}=([^;]*)`)
  );
  return match ? match[1] : null;
}

// use reverse map to create the type from enum's values
export type ReverseMap<T> = T[keyof T];

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getMappingLabelByValue = (map: any, value: any) => {
  const result = map.find((item) => item.value === value);
  return result ? result.label : '';
};

export const getListLabelByValue = (list: List, value: any) => {
  const result = list.find((item) => item.value === value);
  return result ? result.label : '';
};

export const generateMappingList = (
  list: any[],
  keyField: any,
  valueField: any
) => {
  const result: List = list.map((item) => ({
    label: item[valueField],
    value: item[keyField],
    disabled: item?.disabled || false,
  }));
  return result;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + parseInt(days));
  return result;
};

export const convertToList = (data, valueField, labelField): List => {
  return data.map((item) => ({
    value: item[valueField],
    label: item[labelField],
  }));
};

export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (Is.object(target) && Is.object(source)) {
    Object.keys(source).forEach((key) => {
      if (Is.object(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export const convertNlocToScale = (val: string) => {
  if (val === 'NO_DATA') {
    return null; // return null for NO_DATA
  }
  const lowerBound = val.split('-')[0];
  if (lowerBound === '*') {
    return 1;
  }
  if (+lowerBound <= 1000) {
    return 2;
  }
  if (+lowerBound <= 10000) {
    return 3;
  }
  if (+lowerBound <= 100000) {
    return 4;
  }
  return 5;
};

export const renderColorRatting = (val: number, className: string) => {
  if (val === 1)
    return (
      <span
        className={className}
        style={{ display: 'inline-block', background: '#0a0' }}
      >
        A
      </span>
    );
  if (val === 2)
    return (
      <span
        className={className}
        style={{ display: 'inline-block', background: '#b0d513' }}
      >
        B
      </span>
    );
  if (val === 3)
    return (
      <span
        className={className}
        style={{ display: 'inline-block', background: '#eabe06' }}
      >
        C
      </span>
    );
  if (val === 4)
    return (
      <span
        className={className}
        style={{ display: 'inline-block', background: '#ed7d20' }}
      >
        D
      </span>
    );
  return (
    <span
      className={className}
      style={{ display: 'inline-block', background: '#d4333f' }}
    >
      E
    </span>
  );
};

export const filterRole = (roles?: Role[], userRoles?: Role[]) => {
  // return true;
  if (
    userRoles &&
    roles &&
    !userRoles.some((userRole) => roles?.includes(userRole))
  ) {
    return false;
  }
  return true;
};

export const getDefaultRoute = (roles: Role[]) => {
  if (roles.includes(Role.ADMIN) || roles.includes(Role.SUPERADMIN)) {
    return ROUTE.DASHBOARD;
  }
  return ROUTE.MY_COURSE.LIST;
};

export const generateUrl = (url, params = {}) => {
  const urlParams = new URLSearchParams(params);
  return `${url}?${urlParams.toString()}`;
};

export const enableAllowedOptions = (options, allowedValues: any[]) => {
  return options.map((item) => {
    return { ...item, disabled: !allowedValues?.includes(item.value) };
  });
};

export const filterAllowedOptions = (options, allowedValues: any[]) => {
  return options.filter((item) => {
    const isAllowed = allowedValues?.includes(item.value);
    return isAllowed;
  });
};

export const splitStr = (name: string, numberLetter: number) => {
  const words = name.split(' ');
  const result = [];

  for (let i = 0; i < words.length; i += numberLetter) {
    const combined = words.slice(i, i + 2).join(' ');
    result.push(combined);
  }
  return result;
};

export const removeDuplicateAndMerge = (
  arr1: any[],
  arr2: any[],
  key?: string
) => {
  const result = [...arr1];
  arr2.forEach((item) => {
    if (key) {
      const index = arr1.findIndex((i) => i[key] === item[key]);
      if (index < 0) {
        result.push(item);
      } else {
        result[index] = item;
      }
    } else {
      const index = arr1.indexOf(item);
      if (index < 0) {
        result.push(item);
      } else {
        result[index] = item;
      }
    }
  });
  return result;
};

export const configObjectToConditions = (configObject) => {
  if (!configObject) return [];
  return Object.entries(configObject).map(([key, value]) => ({
    key,
    value,
  }));
};

export const handleExportToExcel = (
  data: any[],
  columns: any[],
  fileName: string
) => {
  const dataExport = data?.map((item) => ({
    ...item,
  }));
  const exportInstance = new TableExport(dataExport, columns);
  exportInstance.download(fileName, 'xlsx');
};
