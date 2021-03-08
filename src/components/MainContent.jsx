import React, { useState, useEffect, useCallback } from 'react';
import Table from './Table'
import Chart from './Chart'
import OverdueIssues from './OverdueIssues'
import Drilldown from './Drilldown'
import '../style/MainContent.css';

const MainContent = (props) => {
  const [data, setData] = useState(props.dataResults);
  const drilldownData = props.drilldownData;
  const [planned, setPlanned] = useState(new Array(12).fill(0));
  const [delivered, setDelivered] = useState(new Array(12).fill(0));
  const [drilldownOn, setDrilldownOn] = useState(false);
  // const [month, setMonth] = useState(0);
  const [year, setYear] = useState((new Date()).getFullYear());
  const [status, setStatus] = useState("");
  // console.log("loading");

  useEffect(() => {
    setData(props.dataResults);
    setYear(props.year);
    setPlanned(data['Planned']);
    setDelivered(data['Delivered']);
  },[props.year, props.dataResults])

  const compareArrays = useCallback(
    (array1, array2) => {
      return (array1.length == array2.length) && array1.every(function (element, index) {
        return element === array2[index];
      });
    },[]);

  // const handlerTable = useCallback(
  //   (new_planned, new_delivered) => {
  //     if (!compareArrays(planned, new_planned)) {
  //       setPlanned(new_planned);
  //       setDelivered(new_delivered);
  //       let excel_object = {...data, "Planned": new_planned, "Delivered": new_delivered.map(elem => elem+"%")};
  //       delete excel_object.error;
  //       props.handleExcel(excel_object);
  //     }
  //   }, [planned, data]);

  const handleTableClick = useCallback(
    (status, month) => {
      if(month !== 13) {
        status === "Planned" ? props.handler({ month: month }, 'drilldown') : props.handler({ status: status, month: month }, 'drilldown');
      } else {
        status === "Planned" ? props.handler({}, 'drilldown') : props.handler({ status: status }, 'drilldown');
      }
      setStatus(status);
      setDrilldownOn(true);
    }, [props]);

  const handleOverdueClick = useCallback(
    () => {
      setStatus("Overdue");
      setDrilldownOn(true);
      props.handler({ status: "overdue" }, 'drilldown');
    }, [props]);

  const handleDrilldown = useCallback(
    () => {
      props.handler('','reload');
      // setMonth("");
      setStatus("");
      setDrilldownOn(false);
    }, [props]);

  if (!drilldownOn) {
    // console.log("drilldownMainContent: ",data);
    return (
      <div id="content_section" className="animate-fadein">
        <Table data={data} delivered={delivered} month={props.month} year={year} handleTableClick={handleTableClick} newKey={props.newKey} />
        <Chart data={data} month={props.month} year={props.year} />
        <OverdueIssues overdue={data.error} handleOverdueClick={handleOverdueClick} />
      </div>
    );
  } else {
    return (
      <div id="content_section">
        <Drilldown data={drilldownData} status={status} handleDrilldown={handleDrilldown} />
      </div>
    );
  }
}

export default MainContent;