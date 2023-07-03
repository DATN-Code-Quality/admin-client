import React from 'react';

import { ExportOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import * as XLSX from 'xlsx';

import { ReportCourse } from '~/domain/course';

const DataTable: React.FC<{ courseReport: ReportCourse[]; total: number }> = ({
  courseReport,
  total,
}) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const modifiedDataSource = dataSource.map((item) => {
      const { key, ...rest } = item;
      return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(modifiedDataSource);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  const dataSource = courseReport.map((item) => {
    const { submission } = item;
    const waitToScan = submission.waitToScan || 0;
    const { pass, fail } = { pass: 0, fail: 0, ...submission.scanSuccess };
    const scanning = submission?.scanning || 0;
    const scanFail = submission.scanFail || 0;
    const notSubmit = total - scanning - waitToScan - scanFail - pass - fail;

    return {
      key: item.assignment.id,
      name: item.assignment.name,
      waitToScan,
      scanning,
      submissionPass: pass,
      submissionFail: fail,
      scanFail,
      notSubmit,
    };
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Wait to Scan',
      dataIndex: 'waitToScan',
      key: 'waitToScan',
      align: 'center',
    },
    {
      title: 'Scanning',
      dataIndex: 'scanning',
      key: 'scanning',
      align: 'center',
    },
    {
      title: 'Submisison Pass',
      dataIndex: 'submissionPass',
      key: 'submissionPass',
      align: 'center',
    },
    {
      title: 'Submisison Fail',
      dataIndex: 'submissionFail',
      key: 'submissionFail',
      align: 'center',
    },
    {
      title: 'Error',
      dataIndex: 'scanFail',
      key: 'scanFail',
      align: 'center',
    },
    {
      title: 'Not Submit',
      dataIndex: 'notSubmit',
      key: 'notSubmit',
      align: 'center',
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex align-items justify-between ">
        <p className="font-semibold text-16">Table data</p>
        <Button
          type="primary"
          icon={<ExportOutlined />}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </div>
      <Table
        scroll={{ x: '800px' }}
        dataSource={dataSource}
        columns={columns}
        locale={{ emptyText: 'No submission found' }}
      />
    </div>
  );
};

export default DataTable;
