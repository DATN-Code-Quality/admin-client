import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import { Table, Button, Empty } from 'antd';
import * as XLSX from 'xlsx';

import { useSubmission } from '~/adapters/appService/submission.service';

const DataTable: React.FC<{ courseId: string; assignmentId: string }> = ({
  courseId,
  assignmentId,
}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { getDataExportAssignment } = useSubmission();

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDataExportAssignment(courseId, assignmentId);
      if (response?.status !== 0) return;

      const dataSource = response.data.results.map((item, index) => ({
        key: index + 1,
        userName: item.submission.userNane,
        userMoodleId: item.submission.userMoodleId,
        ...item.result,
      }));

      setData(dataSource);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [assignmentId, courseId]);

  console.log(data);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

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
    const worksheet = XLSX.utils.json_to_sheet(data);
    const sheetName = 'Table Data';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    saveAsExcelFile(excelBuffer, 'table_data.xlsx');
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const dataFile = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(data, fileName);
    } else {
      const url = window.URL.createObjectURL(dataFile);
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
      {!loading && !data && <Empty />}
      {!loading && data && (
        <>
          <Table dataSource={data} columns={columns} scroll={{ x: 1300 }} />
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={exportToExcel}
          >
            Export to Excel
          </Button>
        </>
      )}
    </div>
  );
};

export default DataTable;
