/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Table, Button, Empty } from 'antd';
import tableExport from 'antd-table-export';

import { useSubmission } from '~/adapters/appService/submission.service';
import { SubmissionType } from '~/constant/enum';
import useCurrentWidth from '~/hooks/useCurrentWidth';

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
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [loading, setLoading] = useState(false);
  const { getDataExportAssignment } = useSubmission();

  const paginationData = useMemo(() => {
    const start = (page - 1) * 10;
    return [...(data || [])]?.splice(start, 10);
  }, [data, page]);

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
        setDataFilter(paginationData);
        setLoading(false);
        return;
      }
      const filterData = paginationData?.filter((item) => {
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
          console.log('Value', item, field, item[field], value);
          return item[field] <= +value;
        });
        return v;
      });
      console.log('Filter data', filterData);
      setDataFilter(filterData);
      setLoading(false);
    },
    [paginationData]
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

  const width = useCurrentWidth();

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
      fixed: width > 1023 ? 'left' : 'unset',
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
      key: 'violations',
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
      title: 'Bugs',
      dataIndex: 'bugs',
      key: 'bugs',
      align: 'center',
      hideInTable: true,
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
      key: 'code_smells',
      align: 'center',
      hideInTable: true,
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
      hideInTable: true,
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
    {
      title: 'Blocker',
      dataIndex: 'blocker_violations',
      key: 'blocker_violations',
      align: 'center',
      hideInTable: true,
      render: (val) => {
        return (
          <p
            style={{
              color: +val > +conditions?.blocker_violations ? 'red' : 'black',
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
      key: 'critical_violations',
      align: 'center',
      showInSearch: true,
      hideInTable: true,
      render: (val) => {
        return (
          <p
            style={{
              color: +val > +conditions?.critical_violations ? 'red' : 'black',
            }}
          >
            {val}
          </p>
        );
      },
      sorter: {
        compare: (a, b) => {
          const val_a = Math.floor(parseFloat(a.critical_violations ?? '0'));
          const val_b = Math.floor(parseFloat(b.critical_violations ?? '0'));
          return val_a - val_b;
        },
      },
    },
    {
      title: 'Major',
      dataIndex: 'major_violations',
      key: 'major_violations',
      align: 'center',
      hideInTable: true,
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
      key: 'minor_violations',
      align: 'center',
      hideInTable: true,
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
      key: 'info_violations',
      align: 'center',
      hideInTable: true,
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
    {
      title: 'Type',
      children: [
        {
          title: 'Bugs',
          dataIndex: 'bugs',
          key: 'bugs',
          align: 'center',
          render: (val) => {
            console.log('val', val);
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
      hideInSearch: true,
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
          showInSearch: true,
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
      key: 'duplicated_lines_density',
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
    const columnsExport = columns.filter((item) => item.key);

    const exportInstance = new tableExport(dataExport, columnsExport);
    exportInstance.download('overview', 'xlsx');
  };

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
        scroll={{ x: '1200px' }}
        responsive
        className="responsive-table"
        loading={loading}
        options={{
          reload: false,
        }}
        pagination={{
          pageSize: 10, // Number of items per page
          total: data?.length, // Total number of items (optional)
          onChange: (current, pageSize) => {
            setPage(current);
          },
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
