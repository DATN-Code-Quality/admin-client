/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useState } from 'react';

import { InboxOutlined } from '@ant-design/icons';
import { Button, Select, UploadProps, message } from 'antd';
import './style.css';
import Input from 'antd/lib/input/Input';
import { Option } from 'antd/lib/mentions';
import Upload, { RcFile } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import { useNavigate, useNavigation } from 'react-router-dom';

import { TableViewCondition } from '../table-view-condition';

import { useSubmission } from '~/adapters/appService/submission.service';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import { configObjectToConditions, formatDate } from '~/utils';


export enum SubmissionSource {
  GIT = 'Git',
  // DRIVE = 'Drive',
  // MOODLE = 'Moodle',
  SYSTEM = 'System',
}

type AddSubmissionProps = {
  assignment: Assignment;
  // displayAssignmentInfo?: boolean;
  onSubmitted?: () => void;
  submission?: Submission;
};

const AddSubmission: React.FC<AddSubmissionProps> = (props) => {
  const [isAddSubmission, setIsAddSubmission] = useState<boolean>(false);
  const { assignment, onSubmitted, submission } = props;
  const [conditions, setConditions] = useState<any>([]);

  useEffect(() => {
    if (assignment?.configObject) {
      setConditions(configObjectToConditions(assignment?.configObject));
    }
  }, [assignment]);

  const navigate = useNavigate();
  return (
    <div>
      <div className="gap-4">
        <h2 className="submission-heading">{assignment?.name}</h2>
        <p className="mb-4" />
        <p className="submission-title">Description: </p>
        <p
          dangerouslySetInnerHTML={{ __html: assignment?.description || 'N/A' }}
        />
        <p className="mb-4" />
        <p className="submission-title">Due Date: </p>
        <p>{formatDate(new Date(assignment?.dueDate)) || 'N/A'}</p>
        <p className="mb-4" />
        <p className="submission-title">Quality Gates: </p>
        <TableViewCondition data={conditions} idKey="key" readOnly />
        <p className="mb-4" />
      </div>
      {isAddSubmission === false ? (
        <>
          <SubmmissionStatusSection
            assignment={assignment}
            submission={submission}
          />
          <div
            style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
          >
            <button
              className="ant-btn ant-btn-default"
              onClick={() => {
                setIsAddSubmission(true);
              }}
            >
              {submission !== undefined ? 'Edit submission' : 'Add submission'}
            </button>
          </div>
        </>
      ) : (
        // eslint-disable-next-line no-console
        <AddSubmissionSection
          assignment={assignment}
          submission={submission}
          onSubmitted={() => {
            setIsAddSubmission(false);

            onSubmitted?.();

            // location.reload();
            // navigate(0);
          }}
        />
      )}
    </div>
  );
};

const SubmissionRow = (props: {
  title?: string;
  content?: string;
}): JSX.Element => {
  return (
    <tr className="submission-row">
      <td className="submission-field-td">{props.title ?? ''}</td>
      <td className="submission-content-td">{props.content ?? ''}</td>
    </tr>
  );
};

const SubmmissionStatusSection = (props: AddSubmissionProps): JSX.Element => {
  const { assignment, submission } = props;
  // console.log(`Due: ${assignment.dueDate}`);
  // console.log(`Update: ${submission?.updatedAt}`);
  // let updatedTime=undefined;
  // if(submission){
  //   console.log(assignment.dueDate?.toString().slice(0,19));
  //   console.log(submission.updatedAt?.slice(0,19));
  // }
  return (
    <div style={{ marginTop: 8 }}>
      <p className="submission-title">Submission status</p>
      <div>
        <table style={{ width: '-moz-available', marginTop: 16 }}>
          <tbody>
            {/* <SubmissionRow title="Attemp number" content="0" /> */}
            <SubmissionRow
              title="Submission status"
              content={submission !== undefined ? 'Submitted' : 'No attempt'}
            />
            <SubmissionRow
              title="Last submitted"
              content={
                submission !== undefined && submission.updatedAt !== undefined
                  ? formatDate(
                      new Date(submission.updatedAt ?? ''),
                      'vi-VN',
                      'YYYY-MM-DD hh:mm:ss'
                    )
                  : '-'
              }
            />
            <SubmissionRow title="Grading status" content="Not graded" />
            <SubmissionRow
              title="Due date"
              content={
                assignment.dueDate !== undefined
                  ? formatDate(
                      new Date(assignment.dueDate ?? ''),
                      'vi-VN',
                      'YYYY-MM-DD hh:mm:ss'
                    )
                  : '-'
              }
            />
            {/* <SubmissionRow title="Last submission" content="-" /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// calculate by bytes
const MAXIMUM_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// eslint-disable-next-line @typescript-eslint/ban-types
const AddSubmissionSection = (props: AddSubmissionProps): JSX.Element => {
  const { assignment, onSubmitted, submission } = props;
  const { addSubmission } = useSubmission();
  // handle submit data
  let linkUrl = '';
  const [submissionSrc, setSubmissionSrc] = useState<string>('System');
  const [submittedFile, setSubmittedFile] = useState<
    File | Blob | RcFile | undefined
  >(undefined);

  const submitSubmission = async () => {
    const respond = await addSubmission(
      {
        submitType: submissionSrc.toLowerCase(),
        link: linkUrl,
        file: submittedFile,
      },
      assignment
    );
  };

  const validateFilePick = (file: RcFile) => {
    const fileSize = file.size;
    if (fileSize > MAXIMUM_FILE_SIZE) {
      message.error('Choosen file is too large');
      return false;
    }
    // check type file
    const fileType = file.name.split('.').reverse()[0];

    if (fileType !== 'zip') {
      message.error('Not support for other type except .zip file');
      return false;
    }
    setSubmittedFile(file);
    return true;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      setSubmittedFile(undefined);
    },
    beforeUpload: (file) => {
      const validateRes = validateFilePick(file);
      if (!validateRes) {
        return Upload.LIST_IGNORE;
      }
      setSubmittedFile(file);
      return false;
    },
  };

  return (
    <div className="add-submission-container">
      <div>
        <div className="submission-field" style={{ float: 'left' }}>
          Source origin:{' '}
        </div>
        <Select
          defaultValue="System"
          onSelect={(value) => {
            setSubmissionSrc(value);
            if (value.toLowerCase().indexOf('sys') >= 0) {
              linkUrl = '';
            } else {
              setSubmittedFile(undefined);
            }
          }}
          style={{ width: 200 }}
        >
          {Object.values(SubmissionSource).map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: 8 }}>
        <div className="submission-field" style={{ float: 'left' }}>
          Path:{' '}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {submissionSrc === 'System' ? (
            <Dragger {...uploadProps} style={{ width: '-moz-available' }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Maximum upload file's size
                is 20MB.
              </p>
            </Dragger>
          ) : (
            <>
              <Input
                placeholder="URL of submission zip file"
                onChange={(value) => {
                  linkUrl = value.target.value;
                }}
              />
              {submissionSrc === 'Git' && (
                <span
                  style={{
                    color: '#d6d6d6',
                    fontStyle: 'italic',
                    fontSize: 14,
                  }}
                >
                  Support for public GitHub projects and ensure .git at the end
                  of submitted GitHub URL
                </span>
              )}
            </>
          )}
          <div>
            <Button
              type="primary"
              style={{ backgroundColor: '#007c41', margin: 8 }}
              onClick={async () => {
                if (onSubmitted !== undefined) {
                  // call api to add file
                  await submitSubmission();
                  // back to previous screen
                  onSubmitted();
                }
              }}
            >
              Save changes
            </Button>
            <Button
              type="default"
              title="Cancel"
              onClick={() => {
                if (onSubmitted != undefined) {
                  onSubmitted();
                }
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubmission;
