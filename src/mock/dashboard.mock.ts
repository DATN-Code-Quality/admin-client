import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';

const getTotalRequest = (data) => {
  return data.reduce((acc, cur) => acc + cur.value, 0);
};

const getRandomTotalData = (successData, failData) => {
  const totalData = [];
  for (let i = 0; i < successData.length; i++) {
    totalData.push({
      date: successData[i].date,
      value: successData[i].value + failData[i].value,
    });
  }
  return totalData;
};

export function mockDashboard() {
  return {
    async getDashboard(): Promise<ResponseData<any>> {
      const randomSuccessData = [
        {
          date: '2023-03-03',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-04',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-05',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-06',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-07',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-08',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-09',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-10',
          value: Math.floor(Math.random() * 100),
        },
      ];
      const randomFailData = [
        {
          date: '2023-03-03',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-04',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-05',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-06',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-07',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-08',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-09',
          value: Math.floor(Math.random() * 100),
        },
        {
          date: '2023-03-10',
          value: Math.floor(Math.random() * 100),
        },
      ];
      const randomTotalData = getRandomTotalData(
        randomSuccessData,
        randomFailData
      );

      return mockApi({
        api_overview_list: [
          {
            key: 'total',
            name: 'Total Submission',
            color: '#429EFF',
            data: randomTotalData,
            total: getTotalRequest(randomTotalData),
          },
          {
            key: 'success',
            name: 'Pass',
            color: '#00C853',
            data: randomSuccessData,
            total: getTotalRequest(randomSuccessData),
          },
          {
            key: 'fail',
            name: 'Failed',
            color: '#F64B4B',
            data: randomFailData,
            total: getTotalRequest(randomFailData),
          },
        ],
        chart_type: 1,
        start_date: '2023-03-03',
        end_date: '2023-03-10',
      });
    },
  };
}
