import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import '../style/DropdownExportOptions.css';
import { ReactComponent as Download } from '../images/download-outline.svg';

const DropdownExportOptions = (props) => {
  const data = props.data;

  const [year, setYear] = useState(new Date().getFullYear());
  const [dropHidden, setDropHidden] = useState(false);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    var csvData_setup = [["Status","January","February","March","April","May","June","July","August","September","October","November","December"]];
    for(var key in props.tableData) {
      csvData_setup.push([...props.tableData[key]]);
      csvData_setup[csvData_setup.length-1].unshift(key);
    }
    if(JSON.stringify(csvData_setup) !== JSON.stringify(csvData)) {
      setCsvData(csvData_setup);
    }
  }, [csvData]);

  const handleDropdownClick = () => {
    setDropHidden(!dropHidden);
  }

  const handleItemClick = (yearClicked) => {
    if (year != yearClicked) {
      setYear(yearClicked);
      setDropHidden(false);
      props.handler(yearClicked);
    }
  }

  return (
    <div className="dropdown-export">

      <div className="dropdown box">
        <button id="year-dropdown-btn"
          className="btn btn-primary dropdown-toggle dropdown-year" type="button"
          data-toggle="dropdown" onClick={handleDropdownClick}> {year} <span className="caret caret-right"></span>
        </button>
        {dropHidden ?
          (<ul id="dropdown-list" className="dropdown-menu scrollable-menu">
            {data.map(item => (
              <li key={item} id={item}><a onClick={() => handleItemClick(item)} className="button-year">{item}</a></li>
            ))}
          </ul>) : (<div />)}
      </div>
      
      <CSVLink data={csvData} target="_blank" separator={";"} filename={"sga.csv"}>
      <button id="btnExport" type="button" className="btn btn-md btn-default">
        <Download fill="white" height="20px"/>&nbsp; Excel
					</button>
      </CSVLink>
    </div>
  );
}

export default DropdownExportOptions;