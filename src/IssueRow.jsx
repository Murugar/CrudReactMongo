import React from 'react';
export default function IssueRow(props){
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toLocaleString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.completionDate?issue.completionDate.toLocaleString():''}</td>
      <td>{issue.title}</td>
    </tr>
  );
}