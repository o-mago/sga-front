import React, { useState, useEffect, useCallback } from 'react';
import DropdownExportOptions from './DropdownExportOptions'
import OptionsBoxContainer from './OptionsBoxContainer'
import '../style/NavBar.css';

const NavBar = (props) => {

  const [clear, setClear] = useState(false);

  const box_data_audit = {
    title: "Audit Organization",
    buttons: props.data.audit
  };
  
  const box_data_admin = {
    title: "Administration",
    buttons: props.data.admin,
    relations: {"SUPPLIER": ["Groups"], "oi": ["teste"]}
  };

  const box_data_groups = {
    title: "Groups",
    buttons: props.data.group,
    default: "hidden"
  };
  
  const boxes_data = [box_data_audit, box_data_admin, box_data_groups];

  useEffect(() => {
    setClear(false);
  });

  const handlerYear = useCallback(
    (year) => {
      setClear(true);
      props.handler(year, 'year');
    },[props, clear]);

  const handler = useCallback(
    (value, title) => {
      if(title === 'Audit Organization') {
        props.handler(value, 'component');
      } else if(title === 'Administration') {
        props.handler(value, 'site');
      } else if(title === 'Groups') {
        props.handler(value, 'group');
      }
    },[props]);

  return (
    <div id="buttons_section" className="animate-fadein">
      <DropdownExportOptions data={props.data.year} handler={handlerYear} tableData={props.excelData} updateExcel={props.updateExcel} />
      <OptionsBoxContainer data={boxes_data} handler={handler} clear={clear}/>
    </div>
  );
};

// export default React.memo(NavBar, (prevProps, nextProps) => prevProps.excelData === nextProps.excelData);
export default NavBar;