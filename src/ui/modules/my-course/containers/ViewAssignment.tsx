import { useEffect, useState } from 'react';

import { useAssignment } from '~/adapters/appService/assignment.service';
import useQuery from '~/hooks/useQuery';
import SubmissionComponent from '../components/submission';
import { Assignment } from '~/domain/assignment';


export default function ViewAssignment() {
  const query = useQuery();
  const assignmentId = query.get('id');
  const courseId = query.get('course_id');
  const [assignment, setAssignment] = useState<Assignment | undefined>(
    undefined
  );
  const { getDetailAssignment } = useAssignment();
  useEffect(() => {
    getDetailAssignment({ courseId, assignmentId }).then((result) => {
      if(result.status==0)
      {
   
        setAssignment(result.data.assignment as Assignment);
      }
    });
  }, []);
  return (
    <div>
      {assignment !== undefined && (
        // eslint-disable-next-line react/react-in-jsx-scope
        <SubmissionComponent assignment={assignment} />
      )}
    </div>
  );
}
