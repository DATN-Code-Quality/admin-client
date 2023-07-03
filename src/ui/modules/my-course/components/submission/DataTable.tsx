/* eslint-disable no-unsafe-optional-chaining */
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

const DataTable: React.FC<{
  courseId: string;
  assignmentId: string;
  conditionsRaw: any;
}> = ({ courseId, assignmentId, conditionsRaw }) => {
  const conditions = conditionsRaw?.reduce((obj, item) => {
    obj[item?.key] = +item?.value;
    return obj;
  }, {});
  console.log(conditions);
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
        statusStr = 'Not submitted';
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
      width: '100px',
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
      title: 'Total',
      dataIndex: 'violations',
      key: 'total',
      render: (val) => {
        console.log(val, conditions, val > +conditions?.violations);
        return (
          <p
            style={{
              color: +val > +conditions?.violations ? 'red' : 'black',
            }}
          >
            {val}
          </p>
        );
      },
      align: 'center',
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.violations ?? '0'));
          const val_b = Math.floor(parseFloat(b.violations ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      children: [
        {
          title: 'Bugs',
          dataIndex: 'bugs',
          key: 'bugs',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.bugs ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.bugs ?? '0'));
              const val_b = Math.floor(parseFloat(b.bugs ?? '0'));
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Code Smells',
          dataIndex: 'code_smells',
          key: 'codeSmell',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.code_smells ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.code_smells ?? '0'));
              const val_b = Math.floor(parseFloat(b.code_smells ?? '0'));
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Vulnerabilities',
          dataIndex: 'vulnerabilities',
          key: 'vulnerabilities',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.vulnerabilities ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.vulnerabilities ?? '0'));
              const val_b = Math.floor(parseFloat(b.vulnerabilities ?? '0'));
              return val_a - val_b;
            },
          },
        },
      ],
    },

    {
      title: 'Severity',
      dataIndex: 'type',
      key: 'type',
      children: [
        {
          title: 'Blocker',
          dataIndex: 'blocker_violations',
          key: 'blocker',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color:
                    +val > +conditions?.blocker_violations ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.blocker_violations ?? '0'));
              const val_b = Math.floor(parseFloat(b.blocker_violations ?? '0'));
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Critical',
          dataIndex: 'critical_violations',
          key: 'critical',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color:
                    +val > +conditions?.critical_violations ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(
                parseFloat(a.critical_violations ?? '0')
              );
              const val_b = Math.floor(
                parseFloat(b.critical_violations ?? '0')
              );
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Major',
          dataIndex: 'major_violations',
          key: 'major',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.major_violations ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.major_violations ?? '0'));
              const val_b = Math.floor(parseFloat(b.major_violations ?? '0'));
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Minor',
          dataIndex: 'minor_violations',
          key: 'minor',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.minor_violations ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.minor_violations ?? '0'));
              const val_b = Math.floor(parseFloat(b.minor_violations ?? '0'));
              return val_a - val_b;
            },
          },
        },
        {
          title: 'Info',
          dataIndex: 'info_violations',
          key: 'info',
          align: 'center',
          render: (val) => {
            return (
              <p
                style={{
                  color: +val > +conditions?.info_violations ? 'red' : 'black',
                }}
              >
                {val}
              </p>
            );
          },
          sorter: {
            compare: (a, b) => {
              const val_a = Math.floor(parseFloat(a.info_violations ?? '0'));
              const val_b = Math.floor(parseFloat(b.info_violations ?? '0'));
              return val_a - val_b;
            },
          },
        },
      ],
    },

    {
      title: 'Duplicated Lines Density',
      dataIndex: 'duplicated_lines_density',
      key: 'duplicatedLinesDensity',
      align: 'center',
      render: (val) => {
        return (
          <p
            style={{
              color:
                +val > +conditions?.duplicated_lines_density ? 'red' : 'black',
            }}
          >
            {val}
          </p>
        );
      },
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
      className="tableContainer"
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
