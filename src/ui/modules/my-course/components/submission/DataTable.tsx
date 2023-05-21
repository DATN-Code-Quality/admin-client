import React from 'react';

import { ExportOutlined } from '@ant-design/icons';
import { Table, Button } from 'antd';
import * as XLSX from 'xlsx';

const DataTable: React.FC<{ courseId: string; assignmentId: string }> = ({
  courseId,
  assignmentId,
}) => {
  const response = {
    status: 0,
    data: {
      results: [
        {
          submission: {
            submissionId: 2,
            userId: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
            userNane: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
            userMoodleId: '02',
            status: 2,
          },
        },
        {
          submission: {
            submissionId: 3,
            userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
            userNane: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
            userMoodleId: '01',
            status: 3,
          },
          result: {
            bugs: '0',
            code_smells: '4',
            coverage: '0.0',
            duplicated_lines_density: '0.0',
            ncloc: '254',
            reliability_rating: '1.0',
            security_rating: '1.0',
            sqale_index: '17',
            sqale_rating: '1.0',
            vulnerabilities: '0',
          },
        },
        {
          submission: {
            submissionId: 4,
            userId: '1a514261-43d4-4586-8b21-def3f77db8e6',
            userNane: '1a514261-43d4-4586-8b21-def3f77db8e6',
            userMoodleId: '03',
            status: 4,
          },
          result: {
            bugs: '1',
            code_smells: '11',
            coverage: '0.0',
            duplicated_lines_density: '0.0',
            ncloc: '156',
            reliability_rating: '3.0',
            security_rating: '1.0',
            sqale_index: '43',
            sqale_rating: '1.0',
            vulnerabilities: '0',
          },
        },
      ],
      role: 'teacher',
    },
  };

  const dataSource = response.data.results.map((item, index) => ({
    key: index + 1,
    userName: item.submission.userNane,
    userMoodleId: item.submission.userMoodleId,
    ...item.result,
  }));

  const columns = [
    {
      title: 'User  ID',
      dataIndex: 'userMoodleId',
      key: 'userMoodleId',
      fixed: 'left',
    },
    {
      title: 'Username',
      dataIndex: 'userNane',
      key: 'userNane',
      fixed: 'left',
    },
    {
      title: 'Bugs',
      dataIndex: 'bugs',
      key: 'bugs',
      align: 'center',
    },
    {
      title: 'Code Smells',
      dataIndex: 'code_smells',
      key: 'code_smells',
      align: 'center',
    },
    {
      title: 'Coverage',
      dataIndex: 'coverage',
      key: 'coverage',
      align: 'center',
    },
    {
      title: 'Duplicated Lines Density',
      dataIndex: 'duplicated_lines_density',
      key: 'duplicated_lines_density',
      align: 'center',
    },
    {
      title: 'NCLOC',
      dataIndex: 'ncloc',
      key: 'ncloc',
      align: 'center',
    },
    {
      title: 'Reliability Rating',
      dataIndex: 'reliability_rating',
      key: 'reliability_rating',
      align: 'center',
    },
    {
      title: 'Security Rating',
      dataIndex: 'security_rating',
      key: 'security_rating',
      align: 'center',
    },
    {
      title: 'SQALE Index',
      dataIndex: 'sqale_index',
      key: 'sqale_index',
      align: 'center',
    },
    {
      title: 'SQALE Rating',
      dataIndex: 'sqale_rating',
      key: 'sqale_rating',
      align: 'center',
    },
    {
      title: 'Vulnerabilities',
      dataIndex: 'vulnerabilities',
      key: 'vulnerabilities',
      align: 'center',
    },
  ];
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const sheetName = 'Table Data';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    saveAsExcelFile(excelBuffer, 'table_data.xlsx');
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(data, fileName);
    } else {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        overflowX: 'auto',
        margin: '0 auto',
      }}
    >
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }} />
      <Button type="primary" icon={<ExportOutlined />} onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
};

export default DataTable;
