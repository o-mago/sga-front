import React, { useState, useEffect, useCallback } from 'react';
import '../style/Drilldown.css';
import { ReactComponent as Close } from '../images/close-outline.svg';

const jiraUrl = process.env.REACT_APP_JIRA_URL;

const Drilldown = (props) => {
  const data = props.data;

  const closeDrillDown = useCallback(() => {
    props.handleDrilldown();
  },[props]);

  const filterList = useCallback(
    (filterID) => {
    var input, filter, table, tr, td, i;
    input = document.getElementById(filterID);
    filter = input.value.toUpperCase();
    table = document.getElementById("idDrillDownTable");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
      
      switch(filterID) {
        case "keySearch":
          td = tr[i].getElementsByTagName("td")[0];
          break;
        case "assigneeSearch":
          td = tr[i].getElementsByTagName("td")[1];
          break;
        case "componentSearch":
          td = tr[i].getElementsByTagName("td")[2];
          break;
        case "epicSearch":
          td = tr[i].getElementsByTagName("td")[3];
          break;
        case "dateSearch" :
          td = tr[i].getElementsByTagName("td")[4];
          break;
        case "statusSearch" :
          td = tr[i].getElementsByTagName("td")[5];
          break;
      }
      
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
       } 
    }
  });

  return (
    <div className="panel panel-primary filterable animate-fadein">
      <div id="drillDownTableTitle" className="panel-heading">
        <div className="pull-left">{props.status}</div>
        <div className="pull-right">
						<button className="btn btn-default btn-xs" onClick={closeDrillDown}><Close className="close-icon" height="20px"/> Close </button>
				</div>
      </div>
      <div id="drillDownPanel" className="panel-body">
        <table id="idDrillDownTable" className="table table-hover">
          <thead>
            <tr className="filters">
              <th className="col-sm-1"><input type="text" id="keySearch"
                className="form-control" onKeyUp={() => filterList("keySearch")} placeholder="Key"></input></th>

              <th className="col-md-1"><input type="text" id="assigneeSearch" onKeyUp={() => filterList("assigneeSearch")}
                className="form-control text-center" placeholder="Assignee"></input></th>

              <th className="col-md-1"><input type="text" id="componentSearch" onKeyUp={() => filterList("componentSearch")}
                className="form-control text-center" placeholder="Project Type"></input></th>

              <th className="col-md-2"><input type="text" id="epicSearch" onKeyUp={() => filterList("epicSearch")}
                className="form-control text-center" placeholder="Summary"></input></th>

              <th className="col-md-1"><input type="text" id="dateSearch" onKeyUp={() => filterList("dateSearch")}
                className="form-control text-center" placeholder="Due Date"></input></th>

              <th className="col-md-1"><input type="text" id="dateSearch" onKeyUp={() => filterList("statusSearch")}
                className="form-control text-center" placeholder="Status"></input></th>
            </tr>
          </thead>
          <tbody id="drillDownTable">
          {data.map((elem) => {
            return (<tr>
              <td align="center"><a target="_blank" href={jiraUrl+"/browse/"+elem.key}>{elem.key}</a></td>
              <td align="center">{elem.assignee}</td>
              <td align="center">{elem.type}</td>
              <td align="center">{elem.summary}</td>
              <td align="center">{new Date(elem.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td> 
              <td align="center">{elem.status}</td> 
            </tr>)
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Drilldown;