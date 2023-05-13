import { useState } from "react";

enum SubmissionSource {
  GIT="Git",
  GOOGLE_DRIVE="Google Drive",
  MOODLE="Moodle",
  SYSTEM="System",
}

const AddSubmission: React.FC = () => {
  const [submissionSrc, setSubmissionSrc] = useState<SubmissionSource>(SubmissionSource.SYSTEM);
  return (
    <div>
      <h3>Add Submission</h3>
      <h5>Assigment name</h5>
      <div>
        <span>Description: </span>
        <span> Assigment's description</span>
      </div>
      <div>
        <span>Due: </span>
        <span>31/05/2023, 7:00AM</span>
      </div>
      <div class="add-submission-container">
        <table>
          <tbody>
            <tr>
              <td style={{width:'20%'}}><span>Source: </span></td>
              <td>
                <select>
                  {
                    Object.keys(SubmissionSource).map(
                      (source)=>(<option key={source} value={source}>{SubmissionSource[source]}</option>)
                    )
                  }
                </select>
              </td>
            </tr>

            <tr>
              <td><span>Path: </span></td>
              <td><input /></td>
            </tr>
          </tbody>
        </table>
        <div>
        </div>


      </div>
    </div>
  );
}

export default AddSubmission;
