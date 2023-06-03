import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import { Table, Button, Empty } from 'antd';
import * as XLSX from 'xlsx';

import { SubmissionType } from '../../../../../constant/enum';

import { useSubmission } from '~/adapters/appService/submission.service';

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
        userMoodleId: item?.submission?.userMoodleId,
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
    {
      title: 'User  ID',
      dataIndex: 'userMoodleId',
      key: 'userMoodleId',
      fixed: 'left',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userNane',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Result',
      dataIndex: 'status',
      key: 'status',
      fixed: 'left',
      width: 100,
      render: (value) => {
        return <span>{SubmissionTypeConstant[value]}</span>;
      },
    },
    {
      title: 'Bugs',
      dataIndex: 'bugs',
      key: 'bugs',
      align: 'center',
      width: 100,
    },
    {
      title: 'Code Smells',
      dataIndex: 'code_smells',
      key: 'code_smells',
      align: 'center',
      width: 100,
    },
    {
      title: 'Coverage',
      dataIndex: 'coverage',
      key: 'coverage',
      align: 'center',
      width: 100,
    },
    {
      title: 'Duplicated Lines Density',
      dataIndex: 'duplicated_lines_density',
      key: 'duplicated_lines_density',
      align: 'center',
      width: 150,
    },
    {
      title: 'NCLOC',
      dataIndex: 'ncloc',
      key: 'ncloc',
      align: 'center',
      width: 100,
    },
    {
      title: 'Reliability Rating',
      dataIndex: 'reliability_rating',
      key: 'reliability_rating',
      align: 'center',
      width: 150,
    },
    {
      title: 'Security Rating',
      dataIndex: 'security_rating',
      key: 'security_rating',
      align: 'center',
      width: 100,
    },
    {
      title: 'SQALE Index',
      dataIndex: 'sqale_index',
      key: 'sqale_index',
      align: 'center',
      width: 100,
    },
    {
      title: 'SQALE Rating',
      dataIndex: 'sqale_rating',
      key: 'sqale_rating',
      align: 'center',
      width: 100,
    },
    {
      title: 'Vulnerabilities',
      dataIndex: 'vulnerabilities',
      key: 'vulnerabilities',
      align: 'center',
      width: 150,
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
        maxWidth: '1000px',
        overflowX: 'auto',
        margin: '0 auto',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold mb-2" style={{ fontSize: '16px' }}>
          Table Data
        </p>
        <Button
          type="primary"
          icon={<ExportOutlined />}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 1000 }}
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
