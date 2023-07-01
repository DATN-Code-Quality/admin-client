import React, { useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import SubmissionComponent from '../components/submission';

import { useAssignment } from '~/adapters/appService/assignment.service';
import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import useQuery from '~/hooks/useQuery';
import Loading from '~/ui/shared/loading';
import { generateUrl } from '~/utils';

export default function ViewAssignment() {
  const query = useQuery();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const assignmentId = query.get('id');
  const courseId = query.get('course_id');
  const [assignment, setAssignment] = useState<Assignment | undefined>(
    undefined
  );
  const { getDetailAssignment } = useAssignment();
  useEffect(() => {
    setLoading(true);
    getDetailAssignment({ courseId, assignmentId })
      .then((result) => {
        if (result.status == 0) {
          setAssignment(result.data.assignment as Assignment);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading && <Loading />}
      <p
        className="cursor-pointer mb-2"
        onClick={() => {
          const courseDetailUrl = generateUrl(ROUTE.MY_COURSE.DETAIL, {
            course_id: courseId,
          });
          navigate(courseDetailUrl);
        }}
      >
        <ArrowLeftOutlined size={32} className=" mr-2" />
        <span>Back</span>
      </p>
      {assignment !== undefined && (
        // eslint-disable-next-line react/react-in-jsx-scope
        <SubmissionComponent assignment={assignment} />
      )}
    </div>
  );
}
