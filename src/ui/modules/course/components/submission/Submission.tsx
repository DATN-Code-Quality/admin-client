import React, { useCallback, useEffect, useState } from 'react';

import Overview from './Overview';

import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { Submission } from '~/domain/submission';

const SubmissionComponent: React.FC<{ assignment: any }> = ({ assignment }) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([
    {
      id: '0b3bbb83-f366-44f3-aef7-a4adf5ad4192',
      createdAt: '2023-05-07T05:06:57.276Z',
      updatedAt: '2023-05-07T05:06:57.276Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: '1a461481-6da8-4704-b66f-89c0a6256bb4',
      createdAt: '2023-05-07T05:15:07.088Z',
      updatedAt: '2023-05-07T05:15:07.088Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: '53ebdd6d-a2c8-4267-8769-650af042c998',
      createdAt: '2023-05-07T08:41:53.025Z',
      updatedAt: '2023-05-07T08:41:53.025Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: '9fba310e-b888-4ee0-832a-511aa74c33fa',
      createdAt: '2023-05-07T08:42:08.344Z',
      updatedAt: '2023-05-07T08:42:08.344Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: 'b19ac1d0-bc46-4e69-a18d-01ef300b1e2b',
      createdAt: '2023-05-07T05:06:03.621Z',
      updatedAt: '2023-05-07T05:06:03.621Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: 'bc4e6956-a413-45b7-9960-9fd1d3b66b6d',
      createdAt: '2023-05-07T08:42:06.760Z',
      updatedAt: '2023-05-07T08:42:06.760Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: 'd0a71ded-93a7-4ec4-bba0-901879fe9f35',
      createdAt: '2023-05-07T05:07:54.630Z',
      updatedAt: '2023-05-07T05:07:54.630Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: 'e25b393e-cf56-4e12-8a0b-e7213648ac76',
      createdAt: '2023-05-04T16:15:16.700Z',
      updatedAt: '2023-05-04T16:15:16.700Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'abc.com',
      note: null,
      submitType: 'moodle',
      timemodified: '2023-03-29T17:55:44.000Z',
      userId: '95a4f22f-3c69-4f84-bdb4-00caa6f6007',
      origin: 'origin',
      status: '1',
      grade: null,
      submissionMoodleId: '0001',
      user: {
        id: '95a4f22f-3c69-4f84-bdb4-00caa6f6007',
        createdAt: '2023-05-04T16:15:16.596Z',
        updatedAt: '2023-05-04T16:30:08.146Z',
        deletedAt: null,
        name: 'Nguyễn Văn A',
        role: 'admin',
        email: 'a@gmail.com',
        userId: '0003',
        moodleId: '0001',
        status: 1,
      },
    },
    {
      id: 'e25b393e-cf56-4e12-8a0b-e7213648ac77',
      createdAt: '2023-05-04T16:15:16.700Z',
      updatedAt: '2023-05-04T16:15:16.700Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'abc1.com',
      note: null,
      submitType: 'moodle',
      timemodified: '2023-03-29T17:55:44.000Z',
      userId: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
      origin: 'origin',
      status: '1',
      grade: null,
      submissionMoodleId: '0001',
      user: {
        id: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
        createdAt: '2023-05-04T16:18:28.315Z',
        updatedAt: '2023-05-04T16:18:28.315Z',
        deletedAt: null,
        name: 'Lễ',
        role: 'user',
        email: 'le@gmail.com',
        userId: '02',
        moodleId: '02',
        status: 1,
      },
    },
    {
      id: 'f87efbbf-b972-4c52-9997-d1faf239dc6c',
      createdAt: '2023-05-07T05:17:00.393Z',
      updatedAt: '2023-05-07T05:17:00.393Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
    {
      id: 'fee7c4c5-3d2d-4d3e-b75a-e4b487886202',
      createdAt: '2023-05-07T05:04:07.899Z',
      updatedAt: '2023-05-07T05:04:07.899Z',
      deletedAt: null,
      assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
      link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/e126f344-5fbf-4654-8d9d-37dfd6cc094a/CountReact-master.zip',
      note: 'Note',
      submitType: 'system',
      timemodified: '2023-05-06T09:44:34.000Z',
      userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
      origin: 'origin',
      status: '1',
      grade: 10,
      submissionMoodleId: '0001',
      user: {
        id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
        createdAt: '2023-05-04T16:18:28.303Z',
        updatedAt: '2023-05-04T16:18:28.303Z',
        deletedAt: null,
        name: 'Nhân',
        role: 'user',
        email: 'nhan@gmail.com',
        userId: '01',
        moodleId: '01',
        status: 1,
      },
    },
  ]);
  const [submission, setSubmission] = useState<Submission>();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(assignment.id);
    const { data } = response;
    if (data?.length === 0) return;
    setSubmissionList(data);
    setSubmission(data[0]);
  }, [assignment.id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  const { getSubmissionByAssignmentId } = useSubmission();

  return (
    <div className="grid grid-col-2 bg-white p-4 rounded-2 gap-4">
      <div>
        <p className="assignment-name">{assignment?.name}</p>
        <p>{assignment?.description}</p>
        <div className="submission-container ">
          <p className="title">Bài nộp</p>

          <div className="submission-list">
            {submissionList?.map((submissionItem) => (
              <SubmissionItem
                key={submissionItem.id}
                submission={submissionItem}
                setSubmission={setSubmission}
              />
            ))}
          </div>
          {/* {submission && (
            <>
              <a href={submission?.link} target="_blank" rel="noreferrer">
                {submission?.link}
              </a>
            </>
          )}
          {!submission && (
            <p style={{ fontSize: '16px', fontWeight: 700 }}>Chưa có bài nộp</p>
          )} */}
        </div>
      </div>
      <Overview submission={submission} />
    </div>
  );
};

const SubmissionItem: React.FC<{
  submission: Submission;
  setSubmission: (submission: Submission) => void;
}> = ({ submission, setSubmission }) => {
  return (
    <div
      className="border rounded-2 p-4 mt-4 cursor-pointer"
      onClick={() => setSubmission(submission)}
    >
      <a href={submission.link}>{submission.link}</a>
      <div className="flex items-center justify-between">
        <p>
          Name : <span className="font-semibold">{submission?.user?.name}</span>
        </p>
        <p>
          Time submit :{' '}
          <span className="font-semibold">{submission?.updatedAt} </span>{' '}
        </p>
      </div>
    </div>
  );
};

export default SubmissionComponent;
