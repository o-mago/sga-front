import React, { useState, useEffect, useCallback } from 'react';
import '../style/OverdueIssues.css';

const OverdueIssues = (props) => {
  const [overdue, setOverdue] = useState(props.overdue);

  useEffect(() => {
    setOverdue(props.overdue);
  })

  const handleClick = useCallback(
    () => {
      props.handleOverdueClick();
    }
  );

  return (
    <div id="errorTable" className="table box">
      <div id="errorTableHead" className="text-center panel-heading">
        <span id="errorTableHeadText">Issues Overdue</span>
      </div>
      <div id="errorTableBody" className="text-center">
        <span id="errorTableBodyText"><a className={"link"} onClick={handleClick}><font color="#ffffff">{overdue}</font></a></span>
      </div>
    </div>
  );
}

export default OverdueIssues;