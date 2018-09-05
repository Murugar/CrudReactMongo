import React from 'react';
import IssueRow from './IssueRow';
export default function IssueTable(props) {
  const rows = props.issues.map(issue => (<IssueRow issue={issue} key={issue.id}></IssueRow>));
  return (
    <table border={1} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}