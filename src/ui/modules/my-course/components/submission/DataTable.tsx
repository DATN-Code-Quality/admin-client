import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import { Table, Button, Empty } from 'antd';
import * as XLSX from 'xlsx';

import { useSubmission } from '~/adapters/appService/submission.service';
import { SubmissionType } from '../../../../../constant/enum';

const SubmissionTypeConstant: Record<SubmissionType, string> = {
  [SubmissionType.SUBMITTED]: 'Submitted',
  [SubmissionType.SCANNING]: 'Scanning',
  [SubmissionType.SCANNED_FAIL]: 'Scanned fail',
  [SubmissionType.PASS]: 'Pass',
  [SubmissionType.FAIL]: 'Fail',
};

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
        userName: item?.submission?.userName,
        n: item?.submission?.userMoodleId,
        status: item?.submission?.status,
        ...item.result,
      }));

      setData(dataSource);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [assignmentId, courseId]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const columns = [
    // {
    //   title: 'User ID',
    //   dataIndex: 'userMoodleId',
    //   key: 'userMoodleId',
    //   fixed: 'left',
    //   // sorter: {
    //   //   compare: (a, b) =>{
    //   //     console.log(typeof(a));
    //   //     return a-b;},
    //   // },
    // },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
      sorter: {
        compare: (a, b) =>{
          return a.userName.localeCompare(b.userName);
        },
      },
    },
    {
      title: 'Result',
      dataIndex: 'status',
      key: 'status',
      fixed: 'left',
      render: (value) => {
        return <span>{SubmissionTypeConstant[value]}</span>;
      },
      sorter: {
        compare: (a, b) => {
          return (a.status ?? 0) - (b.status ?? 0);
        },
      },
    },
    {
      title: 'Bugs',
      dataIndex: 'bugs',
      key: 'bugs',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.bug ?? '0'));
          const val_b = Math.floor(parseFloat(b.bug ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Code Smells',
      dataIndex: 'code_smells',
      key: 'code_smells',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.code_smells ?? '0'));
          const val_b = Math.floor(parseFloat(b.code_smells ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Coverage',
      dataIndex: 'coverage',
      key: 'coverage',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.coverage ?? '0'));
          const val_b = Math.floor(parseFloat(b.coverage ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Duplicated Lines Density',
      dataIndex: 'duplicated_lines_density',
      key: 'duplicated_lines_density',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(
            parseFloat(a.duplicated_lines_density ?? '0')
          );
          const val_b = Math.floor(
            parseFloat(b.duplicated_lines_density ?? '0')
          );
          return val_a - val_b;
        },
      },
    },
    {
      title: 'NCLOC',
      dataIndex: 'ncloc',
      key: 'ncloc',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.ncloc ?? '0'));
          const val_b = Math.floor(parseFloat(b.ncloc ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Reliability Rating',
      dataIndex: 'reliability_rating',
      key: 'reliability_rating',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.reliability_rating ?? '0'));
          const val_b = Math.floor(parseFloat(b.reliability_rating ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Security Rating',
      dataIndex: 'security_rating',
      key: 'security_rating',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.security_rating ?? '0'));
          const val_b = Math.floor(parseFloat(b.security_rating ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'SQALE Index',
      dataIndex: 'sqale_index',
      key: 'sqale_index',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.sqale_index ?? '0'));
          const val_b = Math.floor(parseFloat(b.sqale_index ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'SQALE Rating',
      dataIndex: 'sqale_rating',
      key: 'sqale_rating',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.sqale_rating ?? '0'));
          const val_b = Math.floor(parseFloat(b.sqale_rating ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Vulnerabilities',
      dataIndex: 'vulnerabilities',
      key: 'vulnerabilities',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.vulnerabilities ?? '0'));
          const val_b = Math.floor(parseFloat(b.vulnerabilities ?? '0'));
          return val_a - val_b;
        },
      },
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
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 1300 }}
        loading={loading}
      />
      <Button type="primary" icon={<ExportOutlined />} onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
};

export default DataTable;
