/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Table, Button, Empty } from 'antd';
import tableExport from 'antd-table-export';

import { useSubmission } from '~/adapters/appService/submission.service';
import { SubmissionType } from '~/constant/enum';

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
  const [dataFilter, setDataFilter] = useState();
  const [loading, setLoading] = useState(false);
  const { getDataExportAssignment } = useSubmission();

  const renderStatus = useCallback((status: SubmissionType) => {
    let backgroundColor = '';
    let statusStr = '';
    switch (status) {
      case SubmissionType.SCANNING:
        backgroundColor = 'blue';
        statusStr = 'Scanning';
        break;
      case SubmissionType.PASS:
        backgroundColor = 'green';
        statusStr = 'Pass';
        break;
      case SubmissionType.FAIL:
        backgroundColor = 'red';
        statusStr = 'Failed';
        break;
      case SubmissionType.SCANNED_FAIL:
        backgroundColor = 'red';
        statusStr = 'Error';
        break;
      default:
        statusStr = 'Submitted';
        backgroundColor = 'gray';
    }

    return (
      <div
        className="rounded-2"
        style={{
          color: backgroundColor,
          // color: 'white',
          fontWeight: 600,
          minWidth: '80px',
          textAlign: 'left',
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        {statusStr}
      </div>
    );
  }, []);

  const handleFilter = useCallback(
    ({ current, pageSize, ...filters }) => {
      setLoading(true);
      if (Object.keys(filters)?.length === 0 || !filters) {
        setDataFilter(data);
        setLoading(false);
        return;
      }
      const filterData = data?.filter((item) => {
        const v = Object.entries(filters).every(([field, value]) => {
          if (!value) return true;
          if (field === 'userName') {
            return item[field]?.toLowerCase()?.includes(value?.toLowerCase());
          }
          if (field === 'status') {
            let key = -1;
            for (const [keyType, valType] of Object.entries(
              SubmissionTypeConstant
            )) {
              if (valType?.toLocaleLowerCase() === value?.toLocaleLowerCase()) {
                key = +keyType;
              }
            }
            return item[field] === key;
          }
          return item[field] <= +value;
        });
        return v;
      });

      setDataFilter(filterData);
      setLoading(false);
    },
    [data]
  );

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
      setDataFilter(dataSource);
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
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
      sorter: {
        compare: (a, b) => {
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
        return <span>{renderStatus(value)}</span>;
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
    const dataExport = dataFilter?.map((item) => ({
      ...item,
      status: SubmissionTypeConstant[item.status],
    }));
    const exportInstance = new tableExport(dataExport, columns);
    exportInstance.download('overview', 'xlsx');
  };

  console.log(data, dataFilter);

  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
      }}
    >
      <h2>Data Table</h2>
      <ProTable
        dataSource={dataFilter}
        columns={columns}
        scroll={{ x: 1300 }}
        loading={loading}
        options={{
          reload: false,
        }}
        toolBarRender={() => {
          return (
            <Button
              type="primary"
              icon={<ExportOutlined />}
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
          );
        }}
        onReset={() => {
          handleFilter({});
        }}
        request={(params) => {
          handleFilter(params);
        }}
        onFilter={(val) => {
          console.log(val);
        }}
      />
    </div>
  );
};

export default DataTable;
