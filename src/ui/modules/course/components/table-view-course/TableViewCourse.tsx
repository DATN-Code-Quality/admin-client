/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';

import { PlusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

import {
  columnTableCourse,
  columnTableSyncCourse,
  metaFilterCourse,
  metaFilterSyncCourse,
} from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { MESSAGE } from '~/constant/message';
import ROUTE from '~/constant/routes';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import ImportedModal from '~/ui/shared/imported-modal';
import Loading from '~/ui/shared/loading';
import BaseTable from '~/ui/shared/tables';
import TableToolbar from '~/ui/shared/toolbar';
import { formatNumber } from '~/utils';

import './TableViewCourse.less';
import ExcelToObject from '~/ui/shared/data-import';

function TableViewCourse() {
  const navigate = useNavigate();
  const { getAllCourses, getAllMoodleCourses, importCourses } = useCourse();

  const [loading, setLoading] = useState<boolean>(false);

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();

  const handleGetCourses = async (args) => {
    const { startAt, endAt } = args;
    const convertedArgs = {
      ...args,
      startAt: startAt ? new Date(startAt).toISOString() : null,
      endAt: endAt ? new Date(endAt).toISOString() : null,
    };
    const res = await getAllCourses(convertedArgs);
    return res;
  };

  const [list, { onPageChange, onFilterChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetCourses(args),
  });

  const handleUpdateList = async () => {
    const response = await getAllCourses();
    onUpdateList(response.data);
  };

  const handleImportModalOk = async (values) => {
    try {
      await importCourses(values);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    } finally {
      syncMoodleModalActions.handleClose();
    }
  };

  const handleCreateCourse = async () => {
    navigate(ROUTE.COURSE.CREATE);
  };

  const handleUpdateCourse = async (id) => {
    navigate(`${ROUTE.COURSE.EDIT}?id=${id}`);
  };

  const columnTableProps = () => [...columnTableCourse()];

  return (
    <>
      {loading && <Loading />}
      <BaseFilter
        loading={list.isLoading}
        meta={metaFilterCourse()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar title={`Found ${formatNumber(list.total || 0)} courses`}>
          <div
            className="flex items-center flex-nowrap overflow-auto"
            style={{ gap: '16px' }}
          >
            <Button
              type="primary"
              icon={<SyncOutlined />}
              loading={list.isLoading}
              onClick={syncMoodleModalActions.handleOpen}
            >
              Import From Moodle
            </Button>
            <ExcelToObject
              handleImportModalOk={handleImportModalOk}
              loading={list.isLoading}
              name="Import courses"
              handleConvertData={(data, columnNames) => {
                return data
                  ?.slice(1)
                  .map<Record<string, string | number>>((row) => {
                    const obj: Record<string, string | number> = {
                      name: row[columnNames.indexOf('name')],
                      moodleId: row[columnNames.indexOf('moodleId')].toString(),
                      courseMoodleId:
                        row[columnNames.indexOf('courseMoodleId')].toString(),
                      startAt: row[columnNames.indexOf('startAt')].toString(),
                      endAt: row[columnNames.indexOf('endAt')].toString(),
                      summary: row[columnNames.indexOf('summary')],
                      categoryId: '',
                    };
                    return obj;
                  });
              }}
              templateLink="list-course.xlsx"
            />
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              loading={list.isLoading}
              onClick={handleCreateCourse}
            >
              Create
            </Button>
          </div>
        </TableToolbar>
        <BaseTable
          idKey="id"
          columns={columnTableProps()}
          data={list}
          paginationProps={{
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
          }}
          onChange={onPageChange}
        />
      </Card>
      {syncMoodleModalVisible && (
        <>
          <ImportedModal
            idKey="courseMoodleId"
            baseFilterMeta={metaFilterSyncCourse()}
            columns={columnTableSyncCourse()}
            fetchFn={(args) => getAllMoodleCourses(args)}
            onOk={handleImportModalOk}
            onCancel={syncMoodleModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewCourse;
