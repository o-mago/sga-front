import React, { useState, useEffect, useCallback } from 'react';
import '../style/Table.css';
import { ReactComponent as Checkmark } from '../images/checkmark-outline.svg';
import { ReactComponent as Close } from '../images/close-outline.svg';

const Table = (props) => {
  // const data = props.data;
  // console.log("tablePlanned", props.data);
  const [data, setData] = useState(props.data);
  const [key, setKey] = useState("key1");
  const [fade, setFade] = useState("animate-fadein");

  useEffect(() => {
    setFade("animate-fade");
    setKey(props.newKey);
    setTimeout(() => {
      setData(props.data);
    }, 400);
    // setTimeout(() => {
    //     setFade("");
    // }, 1500);
  })

  const buildRows = () => {
    let html = [];
    for (let [key, value] of Object.entries(data)) {
      if (key != "error") {
        html.push(<tr id='table' className='text-right'><td className='text-left'><strong>{key}</strong></td>
          {value.map((item, ind) => {
            let month = ind !== 12 ? ind : 11;
            if (key === "Delivered") {
              let tableDeliveredHtml;
              if (month > props.month || props.year > new Date().getFullYear()) {
                tableDeliveredHtml = <td key={ind} className={"text-right " + fade}><div className="black_font">-</div></td>;
              } else if (item > 90) {
                tableDeliveredHtml = <td key={ind} className={"text-right success " + fade}><div className={"center-flex black_font"}><Checkmark height="20px" /> {item}%</div></td>;
              }
              else {
                tableDeliveredHtml = <td key={ind} className={"text-right danger " + fade}><div className={"center-flex black_font"}><Close height="20px" /> {item}%</div></td>;
              }
              return (tableDeliveredHtml);
            } else {
              return (<td key={ind} className="text-right"><a className={"link " + fade} onClick={() => handleClick(key, ind + 1)}><font color="000000">{item}</font></a></td>)
            }
          })}
        </tr>)
      }
    }
    return html;
  }

  const handleClick = useCallback(
    (status, month) => {
      props.handleTableClick(status, month);
    }, [props]);

  return (
    <div id="table_area" className="box">

      <table id="mainTable" className="table table-hover">
        <thead id="headerTable">
          <tr className="active">
            <th className="col-md-2 table-title">Status</th>
            <th className="text-right col-md-1 table-title">January</th>
            <th className="text-right col-md-1 table-title">February</th>
            <th className="text-right col-md-1 table-title">March</th>
            <th className="text-right col-md-1 table-title">April</th>
            <th className="text-right col-md-1 table-title">May</th>
            <th className="text-right col-md-1 table-title">June</th>
            <th className="text-right col-md-1 table-title">July</th>
            <th className="text-right col-md-1 table-title">August</th>
            <th className="text-right col-md-1 table-title">September</th>
            <th className="text-right col-md-1 table-title">October</th>
            <th className="text-right col-md-1 table-title">November</th>
            <th className="text-right col-md-1 table-title">December</th>
            <th className="text-right col-md-1 table-title">Total</th>
          </tr>
        </thead>
        <tbody key={key}>
          {buildRows()}
          {/* <tr id="table_inProgress" className="text-right">
            <td className="text-left">In Progress</td>
            {data['In Progress'].map((item, ind) => {
              return (<td key={ind} className="text-right"><a className={"link "+fade} onClick={() => handleClick("In Progress", ind+1)}><font color="000000">{item}</font></a></td>)
            })}
          </tr>
          <tr id="table_impeded" className="text-right">
            <td className="text-left">Impeded</td>
            {data['Impeded'].map((item, ind) => {
              return (<td key={ind} className="text-right"><a className={"link "+fade} onClick={() => handleClick("Impeded", ind+1)}><font color="000000">{item}</font></a></td>)
            })}
          </tr>
          <tr id="table_closed" className="text-right">
            <td className="text-left">Done</td>
            {data['Done'].map((item, ind) => {
              return (<td key={ind} className="text-right"><a className={"link "+fade} onClick={() => handleClick("Done", ind+1)}><font color="000000">{item}</font></a></td>)
            })}
          </tr>
          <tr id="table_planned" className="text-right">
            <td className="text-left">Planned</td>
            {data['Planned'].map((item, ind) => {
              return (<td key={ind} className="text-right"><a className={"link "+fade} onClick={() => handleClick("Done", ind+1)}><font color="000000">{item}</font></a></td>)
            })}
          </tr> */}
          {/* <tr id="table_delivered" className="text-right">
            <td className="text-left">Delivered</td>
            {data['Delivered'].map((item, ind) => {
              let tableDeliveredHtml;
              if (ind > props.month || props.year > new Date().getFullYear()) {
                tableDeliveredHtml = <td key={ind} className={"text-right " + fade}><div className="black_font">-</div></td>;
              } else if (item > 90) {
                tableDeliveredHtml = <td key={ind} className={"text-right success " + fade}><div className={"center-flex black_font"}><Checkmark height="20px" /> {item}%</div></td>;
              }
              else {
                tableDeliveredHtml = <td key={ind} className={"text-right danger " + fade}><div className={"center-flex black_font"}><Close height="20px" /> {item}%</div></td>;
              }
              return (tableDeliveredHtml)
            })}
          </tr> */}
        </tbody>
      </table>

    </div>
  );
}

export default Table;